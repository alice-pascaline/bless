import { mockNotificationsApi } from './mockApi';

export const createNotification = async (data) => {
  return { success: true };
};

export const getNotifications = async (params) => {
  return await mockNotificationsApi.getAll();
};

export const getUnreadCount = async () => {
  const notifications = await mockNotificationsApi.getAll();
  return notifications.filter(n => !n.read).length;
};

export const markAsRead = async (id) => {
  return await mockNotificationsApi.markAsRead(id);
};

export const markAllAsRead = async () => {
  return { success: true };
};

export const deleteNotification = async (id) => {
  return { success: true };
};
