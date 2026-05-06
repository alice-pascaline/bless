import api from './api';

export const createBloodRequest = async (data) => {
  const response = await api.post('/blood-requests', data);
  return response.data;
};

export const getBloodRequests = async (params) => {
  const response = await api.get('/blood-requests', { params });
  return response.data;
};

export const getBloodRequestById = async (id) => {
  const response = await api.get(`/blood-requests/${id}`);
  return response.data;
};

export const updateBloodRequest = async (id, data) => {
  const response = await api.put(`/blood-requests/${id}`, data);
  return response.data;
};

export const deleteBloodRequest = async (id) => {
  const response = await api.delete(`/blood-requests/${id}`);
  return response.data;
};
