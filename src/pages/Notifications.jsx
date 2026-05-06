import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaBell, FaCheck, FaCheckDouble, FaTrash } from 'react-icons/fa';
import { getNotifications, markAsRead, markAllAsRead, deleteNotification } from '../services/notificationService';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.data || data || []);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      fetchNotifications();
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.is_read)
    : notifications;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        {notifications.some(n => !n.is_read) && (
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
          >
            <FaCheckDouble /> Mark All as Read
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4">
        <FaBell className="text-gray-400" />
        <button
          onClick={() => setFilter('')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === '' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'unread' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Unread
        </button>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FaBell className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-500">No notifications found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm p-6 border border-gray-100 ${
                !notification.is_read ? 'border-l-4 border-l-red-600' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FaBell className={`${!notification.is_read ? 'text-red-600' : 'text-gray-400'}`} />
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      notification.type === 'request' ? 'bg-blue-100 text-blue-800' :
                      notification.type === 'approval' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {notification.type}
                    </span>
                    {!notification.is_read && (
                      <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-gray-800">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {notification.created_at ? new Date(notification.created_at).toLocaleString() : 'N/A'}
                  </p>
                </div>

                <div className="flex gap-2">
                  {!notification.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="Mark as read"
                    >
                      <FaCheck />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
