import React, { useEffect, useState } from 'react';
import { getClients, createAppointment } from './api';
import { TextField, Button, MenuItem, CircularProgress, Alert, Stack } from '@mui/material';

function AppointmentForm({ onSuccess, initialData, onSubmit, isEdit }) {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState(initialData?.client?.id || initialData?.client_id || '');
  const [date, setDate] = useState(initialData ? initialData.scheduled_at?.slice(0, 10) : '');
  const [time, setTime] = useState(initialData ? new Date(initialData.scheduled_at).toISOString().slice(11, 16) : '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getClients()
      .then(setClients)
      .catch(() => setError('Failed to load clients'))
      .finally(() => setFetching(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!clientId || !date || !time) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    const scheduled_at = new Date(`${date}T${time}`);
    const data = { client_id: clientId, scheduled_at, notes };
    if (onSubmit) {
      // For edit: call parent handler
      onSubmit(data);
      setLoading(false);
      return;
    }
    createAppointment({ appointment: data })
      .then(() => {
        setSuccess(true);
        setClientId(''); setDate(''); setTime(''); setNotes('');
        if (onSuccess) onSuccess();
      })
      .catch(() => setError('Failed to create appointment'))
      .finally(() => setLoading(false));
  };

  if (fetching) return <CircularProgress />;

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ minWidth: 300 }}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Appointment scheduled!</Alert>}
        <TextField
          select
          label="Client"
          value={clientId}
          onChange={e => setClientId(e.target.value)}
          required
        >
          {clients.map(c => (
            <MenuItem key={c.id} value={c.id}>{c.name} ({c.email})</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Time"
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          multiline
          minRows={2}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : isEdit ? 'Update' : 'Schedule'}
        </Button>
      </Stack>
    </form>
  );
}

export default AppointmentForm; 