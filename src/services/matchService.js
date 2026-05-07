import { mockMatchesApi } from './mockApi';

export const getMatches = async (params) => {
  return await mockMatchesApi.getMatches();
};

export const getDonorMatches = async () => {
  return await mockMatchesApi.getMatches();
};

export const getHospitalMatches = async () => {
  return await mockMatchesApi.getMatches();
};

export const getMatchById = async (id) => {
  const matches = await mockMatchesApi.getMatches();
  return matches.find(m => m.id === parseInt(id));
};

export const acceptMatch = async (id) => {
  return await mockMatchesApi.acceptMatch(id);
};

export const declineMatch = async (id) => {
  return { success: true };
};
