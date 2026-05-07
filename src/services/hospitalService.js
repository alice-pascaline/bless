import api from './api';

export const getHospitals = async (params) => {
  const response = await api.get('/hospitals', { params });
  return response.data;
};

export const getHospitalById = async (id) => {
  const response = await api.get(`/hospitals/${id}`);
  return response.data;
};

export const getHospitalBloodRequests = async () => {
  const response = await api.get('/blood-requests/hospital');
  return response.data;
};

export const updateHospitalProfile = async (data) => {
  const response = await api.put('/hospitals/profile', data);
  return response.data;
};
