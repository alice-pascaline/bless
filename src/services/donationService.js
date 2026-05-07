import { mockDonationsApi } from './mockApi';

export const getDonations = async (params) => {
  return await mockDonationsApi.getAll();
};

export const getDonationById = async (id) => {
  const donations = await mockDonationsApi.getAll();
  return donations.find(d => d.id === parseInt(id));
};

export const createDonation = async (data) => {
  return await mockDonationsApi.create(data);
};

export const updateDonation = async (id, data) => {
  return { success: true };
};

export const getMyDonations = async () => {
  return await mockDonationsApi.getAll();
};

export const completeDonation = async (id) => {
  return { success: true };
};
