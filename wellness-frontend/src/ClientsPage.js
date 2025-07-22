import React, { useEffect, useState } from 'react';
import { getClients, searchClients } from './api';
import { TextField, Typography, Paper, Grid, Card, CardContent, Avatar, CircularProgress, InputAdornment, Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function stringAvatar(name) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return { children: initials };
}

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    getClients()
      .then(setClients)
      .catch(() => setError('Failed to load clients'))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim() === '') {
      setSearching(true);
      getClients().then(setClients).finally(() => setSearching(false));
      return;
    }
    setSearching(true);
    searchClients(e.target.value)
      .then(setClients)
      .catch(() => setSnackbar({ open: true, message: 'Search failed', severity: 'error' }))
      .finally(() => setSearching(false));
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 900, mx: 'auto', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700, letterSpacing: 1 }}>Clients</Typography>
      <TextField
        fullWidth
        placeholder="Search by name, email, or phone"
        value={search}
        onChange={handleSearch}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3, background: '#fff', borderRadius: 1 }}
      />
      {loading || searching ? <CircularProgress sx={{ mt: 2, display: 'block', mx: 'auto' }} /> : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {clients.map((client) => (
            <Grid item xs={12} sm={6} md={4} key={client.id}>
              <Card elevation={3} sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 3, background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)' }}>
                <Avatar {...stringAvatar(client.name)} sx={{ width: 56, height: 56, mr: 2, bgcolor: 'primary.main', fontWeight: 700, fontSize: 24 }} />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{client.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Email: {client.email}</Typography>
                  <Typography variant="body2" color="text.secondary">Phone: {client.phone_number}</Typography>
                </CardContent>
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

export default ClientsPage; 