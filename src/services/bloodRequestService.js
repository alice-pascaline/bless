import { mockBloodRequestsApi } from './mockApi';

export const createBloodRequest = async (data) => {
  return await mockBloodRequestsApi.create(data);
};

export const getBloodRequests = async (params) => {
  return await mockBloodRequestsApi.getAll();
};

export const getBloodRequestById = async (id) => {
  return await mockBloodRequestsApi.getById(id);
};

export const updateBloodRequest = async (id, data) => {
  return await mockBloodRequestsApi.update(id, data);
};

export const deleteBloodRequest = async (id) => {
  // Mock delete - in real app this would call API
  return { success: true };
};
