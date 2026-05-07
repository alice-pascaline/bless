import { mockAuth } from './mockApi';

export const register = async (userData) => {
  return await mockAuth.register(userData);
};

export const login = async (credentials) => {
  return await mockAuth.login(credentials.email, credentials.password);
};

export const getProfile = async () => {
  // Mock profile data - in real app this would fetch from API
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

export const logout = async () => {
  return await mockAuth.logout();
};
