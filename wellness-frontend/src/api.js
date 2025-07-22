import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000/api/v1';

const apiKey = process.env.REACT_APP_API_KEY;
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: 'application/json',
    ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
  },
});

export const getClients = () => axiosInstance.get('/clients').then(res => res.data);
export const searchClients = (query) => axiosInstance.get('/clients/search', { params: { search: query } }).then(res => res.data);
export const getAppointments = () => axiosInstance.get('/appointments').then(res => res.data);
export const createAppointment = (data) => axiosInstance.post('/appointments', data).then(res => res.data);
export const updateAppointment = (id, data) => axiosInstance.patch(`/appointments/${id}`, data).then(res => res.data);
export const deleteAppointment = (id) => axiosInstance.delete(`/appointments/${id}`); 