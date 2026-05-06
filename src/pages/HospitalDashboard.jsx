import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTint, FaHospital, FaHandshake, FaCheckCircle, FaPlus } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getHospitalBloodRequests } from '../services/hospitalService';
import { getHospitalMatches } from '../services/matchService';

const HospitalDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    fulfilledRequests: 0,
    totalMatches: 0
  });
  const [requests, setRequests] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [requestsRes, matchesRes] = await Promise.all([
        getHospitalBloodRequests(),
        getHospitalMatches()
      ]);
      
      const requestsData = requestsRes.data || requestsRes || [];
      const matchesData = matchesRes.data || matchesRes || [];
      
      setRequests(requestsData);
      setMatches(matchesData);
      
      setStats({
        totalRequests: requestsData.length,
        pendingRequests: requestsData.filter(r => r.status === 'pending').length,
        fulfilledRequests: requestsData.filter(r => r.status === 'fulfilled').length,
        totalMatches: matchesData.length
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const requestStatusData = [
    { name: 'Pending', value: requests.filter(r => r.status === 'pending').length },
    { name: 'Approved', value: requests.filter(r => r.status === 'approved').length },
    { name: 'Fulfilled', value: requests.filter(r => r.status === 'fulfilled').length },
    { name: 'Cancelled', value: requests.filter(r => r.status === 'cancelled').length },
  ];

  const urgencyData = [
    { name: 'High', value: requests.filter(r => r.urgency_level === 'high').length, color: '#ef4444' },
    { name: 'Medium', value: requests.filter(r => r.urgency_level === 'medium').length, color: '#f59e0b' },
    { name: 'Low', value: requests.filter(r => r.urgency_level === 'low').length, color: '#10b981' },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

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
        <h1 className="text-3xl font-bold text-gray-800">Hospital Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome, {user?.Hospital?.hospital_name || user?.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <FaTint className="text-red-600 text-xl" />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.totalRequests}</h3>
          <p className="text-gray-600 text-sm mt-1">Blood Requests</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FaHospital className="text-blue-600 text-xl" />
            </div>
            <span className="text-sm text-gray-500">Pending</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.pendingRequests}</h3>
          <p className="text-gray-600 text-sm mt-1">Pending Requests</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
            <span className="text-sm text-gray-500">Done</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.fulfilledRequests}</h3>
          <p className="text-gray-600 text-sm mt-1">Fulfilled</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <FaHandshake className="text-purple-600 text-xl" />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.totalMatches}</h3>
          <p className="text-gray-600 text-sm mt-1">Matches</p>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Urgency Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={urgencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ef4444">
                {urgencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
