import api from './api';

export const getMatches = async (params) => {
  const response = await api.get('/matches', { params });
  return response.data;
};

export const getDonorMatches = async () => {
  const response = await api.get('/matches/donor');
  return response.data;
};

export const getHospitalMatches = async () => {
  const response = await api.get('/matches/hospital');
  return response.data;
};

export const getMatchById = async (id) => {
  const response = await api.get(`/matches/${id}`);
  return response.data;
};

export const acceptMatch = async (id) => {
  const response = await api.put(`/matches/${id}/accept`);
  return response.data;
};

export const declineMatch = async (id) => {
  const response = await api.put(`/matches/${id}/decline`);
  return response.data;
};
