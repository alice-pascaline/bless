import api from './api';

export const getDonors = async (params) => {
  const response = await api.get('/donors', { params });
  return response.data;
};

// export const getAvailableDonors = async (params) => {
//   const response = await api.get('/donors/available', { params });
//   return response.data;
// };

// export const getDonorById = async (id) => {
//   const response = await api.get(`/donors/${id}`);
//   return response.data;
// };

export const getDonorProfile = async () => {
  const response = await api.get('/donors/profile');
  return response.data;
};

// export const getDonorMatches = async () => {
//   const response = await api.get('/donors/matches');
//   return response.data;
// };

export const createDonationFromMatch = async (data) => {
  const response = await api.post('/donors/donations', data);
  return response.data;
};

export const getAvailableDonors = async (bloodType) => {
  const response = await api.get('/donors/available', { params: { blood_type: bloodType } });
  return response.data;
};

export const getDonorMatches = async () => {
  const response = await api.get('/donors/matches');
  return response.data;
};

export const getDonorById = async (id) => {
  const response = await api.get(`/donors/${id}`);
  return response.data;
};

export const updateDonorProfile = async (data) => {
  const response = await api.put('/donors/profile', data);
  return response.data;
};
