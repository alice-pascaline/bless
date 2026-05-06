import api from './api';

export const getDonations = async (params) => {
  const response = await api.get('/donations', { params });
  return response.data;
};

export const getDonationById = async (id) => {
  const response = await api.get(`/donations/${id}`);
  return response.data;
};

export const createDonation = async (data) => {
  const response = await api.post('/donations', data);
  return response.data;
};

export const updateDonation = async (id, data) => {
  const response = await api.put(`/donations/${id}`, data);
  return response.data;
};

export const getMyDonations = async () => {
  const response = await api.get('/donations/my-donations');
  return response.data;
};

export const completeDonation = async (id) => {
  const response = await api.put(`/donations/${id}/complete`);
  return response.data;
};
