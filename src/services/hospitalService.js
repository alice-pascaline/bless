import { mockHospitalsApi, mockBloodRequestsApi } from './mockApi';
import { mockUsers } from './mockData';

export const getHospitals = async (params) => {
  return await mockHospitalsApi.getAll();
};

export const getHospitalById = async (id) => {
  const hospitals = await mockHospitalsApi.getAll();
  return hospitals.find(h => h.id === parseInt(id));
};

export const getHospitalBloodRequests = async () => {
  return await mockBloodRequestsApi.getAll();
};

export const updateHospitalProfile = async (data) => {
  return { ...mockUsers.hospital, ...data };
};
