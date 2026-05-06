import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaUsers, FaUserMd, FaHospital, FaTint, FaExchangeAlt, FaBell, FaChartLine } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import api from '../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonors: 0,
    totalHospitals: 0,
    totalRequests: 0,
    pendingRequests: 0,
    fulfilledRequests: 0,
    totalDonations: 0,
    completedDonations: 0,
    totalMatches: 0,
    unreadNotifications: 0
  });
  const [recentDonors, setRecentDonors] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await api.get('/admin/dashboard');
      setStats(data.data?.stats || data.stats || stats);
      setRecentDonors(data.data?.recentActivity?.donors || []);
      setRecentRequests(data.data?.recentActivity?.requests || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const requestStatusData = [
    { name: 'Pending', value: stats.pendingRequests, color: '#f59e0b' },
    { name: 'Approved', value: stats.totalRequests - stats.pendingRequests - stats.fulfilledRequests, color: '#3b82f6' },
    { name: 'Fulfilled', value: stats.fulfilledRequests, color: '#10b981' },
  ];

  const userDistributionData = [
    { name: 'Donors', value: stats.totalDonors, color: '#ef4444' },
    { name: 'Hospitals', value: stats.totalHospitals, color: '#3b82f6' },
    { name: 'Admins', value: stats.totalUsers - stats.totalDonors - stats.totalHospitals, color: '#8b5cf6' },
  ];

  const monthlyData = [
    { month: 'Jan', requests: 12, donations: 8 },
    { month: 'Feb', requests: 19, donations: 15 },
    { month: 'Mar', requests: 15, donations: 12 },
    { month: 'Apr', requests: 25, donations: 20 },
    { month: 'May', requests: 22, donations: 18 },
  ];

  const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome, {user?.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.totalUsers}</h3>
          <p className="text-gray-600 text-sm mt-1">Total Users</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <FaUserMd className="text-red-600 text-xl" />
            </div>
            <span className="text-sm text-gray-500">Active</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.totalDonors}</h3>
          <p className="text-gray-600 text-sm mt-1">Donors</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <FaHospital className="text-green-600 text-xl" />
            </div>
            <span className="text-sm text-gray-500">Active</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.totalHospitals}</h3>
          <p className="text-gray-600 text-sm mt-1">Hospitals</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <FaTint className="text-purple-600 text-xl" />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.totalRequests}</h3>
          <p className="text-gray-600 text-sm mt-1">Blood Requests</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <FaExchangeAlt className="text-yellow-600 text-xl" />
            </div>
            <span className="text-sm text-gray-500">Pending</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.pendingRequests}</h3>
          <p className="text-gray-600 text-sm mt-1">Pending Requests</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <FaChartLine className="text-green-600 text-xl" />
            </div>
            <span className="text-sm text-gray-500">Done</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.completedDonations}</h3>
          <p className="text-gray-600 text-sm mt-1">Completed Donations</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
              <FaBell className="text-indigo-600 text-xl" />
            </div>
            <span className="text-sm text-gray-500">Unread</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.unreadNotifications}</h3>
          <p className="text-gray-600 text-sm mt-1">Notifications</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Request Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={requestStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {requestStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {userDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="donations" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/users" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center">
              <FaUsers className="text-blue-600 text-2xl mx-auto mb-2" />
              <span className="text-sm font-medium text-blue-800">Manage Users</span>
            </Link>
            <Link to="/admin/donors" className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition text-center">
              <FaUserMd className="text-red-600 text-2xl mx-auto mb-2" />
              <span className="text-sm font-medium text-red-800">Manage Donors</span>
            </Link>
            <Link to="/admin/hospitals" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition text-center">
              <FaHospital className="text-green-600 text-2xl mx-auto mb-2" />
              <span className="text-sm font-medium text-green-800">Manage Hospitals</span>
            </Link>
            <Link to="/admin/requests" className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-center">
              <FaTint className="text-purple-600 text-2xl mx-auto mb-2" />
              <span className="text-sm font-medium text-purple-800">View Requests</span>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Donors</h3>
          <div className="space-y-3">
            {recentDonors.length > 0 ? recentDonors.map((donor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{donor.user?.name || 'N/A'}</p>
                  <p className="text-sm text-gray-600">{donor.blood_type} • {donor.location || 'No location'}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${donor.availability_status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {donor.availability_status ? 'Available' : 'Unavailable'}
                </span>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No recent donors</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
