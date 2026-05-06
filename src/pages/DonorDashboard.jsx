import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTint, FaHandshake, FaHistory, FaCheckCircle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getMyDonations } from '../services/donationService';
import { getDonorMatches } from '../services/matchService';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDonations: 0,
    pendingMatches: 0,
    completedDonations: 0,
    available: true
  });
  const [donations, setDonations] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [donationsRes, matchesRes] = await Promise.all([
        getMyDonations(),
        getDonorMatches()
      ]);
      
      const donationsData = donationsRes.data || donationsRes || [];
      const matchesData = matchesRes.data || matchesRes || [];
      
      setDonations(donationsData);
      setMatches(matchesData);
      
      setStats({
        totalDonations: donationsData.length,
        pendingMatches: matchesData.filter(m => m.match_status === 'suggested').length,
        completedDonations: donationsData.filter(d => d.status === 'completed').length,
        available: user?.Donor?.availability_status ?? true
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const donationStatusData = [
    { name: 'Pending', value: donations.filter(d => d.status === 'pending').length },
    { name: 'Accepted', value: donations.filter(d => d.status === 'accepted').length },
    { name: 'Completed', value: donations.filter(d => d.status === 'completed').length },
    { name: 'Rejected', value: donations.filter(d => d.status === 'rejected').length },
  ];

  const monthlyData = [
    { month: 'Jan', donations: 2 },
    { month: 'Feb', donations: 3 },
    { month: 'Mar', donations: 1 },
    { month: 'Apr', donations: 4 },
    { month: 'May', donations: 2 },
  ];

  const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];

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
        <h1 className="text-3xl font-bold text-gray-800">Donor Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
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
          <h3 className="text-3xl font-bold text-gray-800">{stats.totalDonations}</h3>
          <p className="text-gray-600 text-sm mt-1">Total Donations</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FaHandshake className="text-blue-600 text-xl" />
            </div>
            <span className="text-sm text-gray-500">Pending</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.pendingMatches}</h3>
          <p className="text-gray-600 text-sm mt-1">Pending Matches</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
            <span className="text-sm text-gray-500">Done</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.completedDonations}</h3>
          <p className="text-gray-600 text-sm mt-1">Completed</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              stats.available ? 'bg-green-50' : 'bg-gray-50'
            }`}>
              <FaTint className={`text-xl ${stats.available ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
            <span className="text-sm text-gray-500">Status</span>
          </div>
          <h3 className={`text-3xl font-bold ${stats.available ? 'text-green-600' : 'text-gray-400'}`}>
            {stats.available ? 'Yes' : 'No'}
          </h3>
          <p className="text-gray-600 text-sm mt-1">Available</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Donation Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={donationStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {donationStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Donations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="donations" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/donor/matches"
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
          >
            <FaHandshake /> View Matches
          </Link>
          <Link
            to="/donor/donations"
            className="px-6 py-3 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center gap-2"
          >
            <FaHistory /> My Donations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
