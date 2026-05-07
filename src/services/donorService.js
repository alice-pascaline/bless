import { mockProfileApi, mockMatchesApi, mockDonationsApi } from './mockApi';
import { mockUsers } from './mockData';

export const getDonors = async (params) => {
  return [mockUsers.donor];
};

export const getDonorProfile = async () => {
  return await mockProfileApi.getProfile();
};

export const createDonationFromMatch = async (data) => {
  return await mockDonationsApi.create(data);
};

export const getAvailableDonors = async (bloodType) => {
  return [mockUsers.donor];
};

export const getDonorMatches = async () => {
  return await mockMatchesApi.getMatches();
};

export const getDonorById = async (id) => {
  return mockUsers.donor;
};

export const updateDonorProfile = async (data) => {
  return await mockProfileApi.updateProfile(mockUsers.donor.id, data);
};
