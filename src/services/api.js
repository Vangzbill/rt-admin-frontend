import axios from 'axios';

const API_URL = 'http://localhost:8070/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const penghuniAPI = {
  getAll: () => api.get('/penghunis'),
  getById: (id) => api.get(`/penghunis/${id}`),
  create: (data) => api.post('/penghunis', data),
  update: (id, data) => api.put(`/penghunis/${id}`, data),
  delete: (id) => api.delete(`/penghunis/${id}`),
};

export const rumahAPI = {
  getAll: () => api.get('/rumahs'),
  getById: (id) => api.get(`/rumahs/${id}`),
  create: (data) => api.post('/rumahs', data),
  update: (id, data) => api.put(`/rumahs/${id}`, data),
  delete: (id) => api.delete(`/rumahs/${id}`),
  getHistory: (id) => api.get(`/rumahs/${id}/history`),
};

export const penghuniRumahAPI = {
  create: (data) => api.post('/penghuni-rumah', data),
  update: (id, data) => api.put(`/penghuni-rumah/${id}`, data),
};

export const pembayaranAPI = {
  create: (data) => api.post('/pembayarans', data),
  getHistoryByRumah: (penghuniRumahId) => 
    api.get(`/pembayarans/rumah/${penghuniRumahId}`),
};

export const pengeluaranAPI = {
  getAll: () => api.get('/pengeluarans'),
  create: (data) => api.post('/pengeluarans', data),
};

export const laporanAPI = {
  getSummaryTahunan: () => api.get('/laporan/tahunan'),
  getDetailBulanan: () => api.get('/laporan/bulanan'),
};