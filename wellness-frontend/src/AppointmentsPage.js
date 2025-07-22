import React, { useEffect, useState } from 'react';
import { getAppointments, deleteAppointment, updateAppointment } from './api';
import { Typography, Paper, Grid, Card, CardContent, Avatar, CircularProgress, IconButton, Button, Dialog, DialogTitle, DialogContent, Snackbar, Alert, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import AppointmentForm from './AppointmentForm';

function stringAvatar(name) {
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
  return { children: initials };
}

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteId, setDeleteId] = useState(null);

  const fetchAppointments = () => {
    setLoading(true);
    getAppointments()
      .then(setAppointments)
      .catch(() => setError('Failed to load appointments'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = (id) => {
    deleteAppointment(id)
      .then(() => {
        setSnackbar({ open: true, message: 'Appointment deleted', severity: 'success' });
        fetchAppointments();
      })
      .catch(() => setSnackbar({ open: true, message: 'Delete failed', severity: 'error' }));
    setDeleteId(null);
  };

  const handleEdit = (appt) => {
    setEditData(appt);
    setEditOpen(true);
  };

  const handleEditSubmit = (data) => {
    updateAppointment(editData.id, { appointment: data })
      .then(() => {
        setSnackbar({ open: true, message: 'Appointment updated!', severity: 'success' });
        setEditOpen(false);
        setEditData(null);
        fetchAppointments();
      })
      .catch(() => setSnackbar({ open: true, message: 'Update failed', severity: 'error' }));
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 1100, mx: 'auto', background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700, letterSpacing: 1 }}>Appointments</Typography>
      <Button variant="contained" startIcon={<AddIcon />} sx={{ mb: 2, float: 'right' }} onClick={() => setOpen(true)}>
        Schedule Appointment
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Schedule Appointment</DialogTitle>
        <DialogContent>
          <AppointmentForm onSuccess={() => { setOpen(false); fetchAppointments(); setSnackbar({ open: true, message: 'Appointment scheduled!', severity: 'success' }); }} />
        </DialogContent>
      </Dialog>
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this appointment?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="error" onClick={() => handleDelete(deleteId)}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          {editData && <AppointmentForm
            onSuccess={() => { setEditOpen(false); setEditData(null); fetchAppointments(); setSnackbar({ open: true, message: 'Appointment updated!', severity: 'success' }); }}
            initialData={editData}
            onSubmit={handleEditSubmit}
            isEdit
          />}
        </DialogContent>
      </Dialog>
      {loading ? <CircularProgress sx={{ mt: 2, display: 'block', mx: 'auto' }} /> : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {appointments.map((appt) => (
            <Grid item xs={12} sm={6} md={4} key={appt.id}>
              <Card elevation={3} sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 3, background: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)', position: 'relative' }}>
                <Avatar {...stringAvatar(appt.client?.name)} sx={{ width: 56, height: 56, mr: 2, bgcolor: 'secondary.main', fontWeight: 700, fontSize: 24 }} />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                    <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
                    {appt.client?.name || 'Unknown Client'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">{new Date(appt.scheduled_at).toLocaleString()}</Typography>
                  <Typography variant="body2" color="text.secondary">Email: {appt.client?.email || 'N/A'}</Typography>
                  <Typography variant="body2" color="text.secondary">Phone: {appt.client?.phone_number || 'N/A'}</Typography>
                  {appt.notes && <Typography variant="body2" color="text.secondary">Notes: {appt.notes}</Typography>}
                </CardContent>
                <IconButton edge="end" aria-label="edit" color="primary" sx={{ position: 'absolute', top: 8, right: 48 }} onClick={() => handleEdit(appt)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" color="error" sx={{ position: 'absolute', top: 8, right: 8 }} onClick={() => setDeleteId(appt.id)}>
                  <DeleteIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default AppointmentsPage; 