import { useEffect, useState } from 'react';
import { FaUserMd, FaTint, FaMapMarkerAlt, FaCheck, FaTimes, FaFilter } from 'react-icons/fa';
import api from '../services/api';

const AdminDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bloodTypeFilter, setBloodTypeFilter] = useState('');
  const [availableFilter, setAvailableFilter] = useState('');

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const params = {};
      if (bloodTypeFilter) params.blood_type = bloodTypeFilter;
      if (availableFilter !== '') params.available = availableFilter;

      const data = await api.get('/admin/donors', { params });
      setDonors(data.data || data || []);
    } catch (error) {
      console.error('Failed to fetch donors:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    try {
      await api.put(`/admin/donors/${id}`, { availability_status: !currentStatus });
      fetchDonors();
    } catch (error) {
      console.error('Failed to update donor:', error);
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-800">Manage Donors</h1>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4 flex-wrap">
        <FaFilter className="text-gray-400" />
        <select
          value={bloodTypeFilter}
          onChange={(e) => setBloodTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">All Blood Types</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <select
          value={availableFilter}
          onChange={(e) => setAvailableFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
        <button
          onClick={fetchDonors}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Filter
        </button>
      </div>

      {/* Donors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donors.map((donor) => (
          <div key={donor.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {donor.user?.name?.charAt(0).toUpperCase() || 'D'}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{donor.user?.name || 'N/A'}</h3>
                  <p className="text-sm text-gray-600">{donor.user?.email || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <FaTint className="text-red-600" />
                <span className="text-gray-600">Blood Type:</span>
                <span className="font-semibold">{donor.blood_type || 'N/A'}</span>
              </div>
              {donor.location && (
                <div className="flex items-center gap-2 text-sm">
                  <FaMapMarkerAlt className="text-red-600" />
                  <span className="text-gray-600">{donor.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">User Status:</span>
                <span className={`font-semibold ${donor.user?.is_active ? 'text-green-600' : 'text-red-600'}`}>
                  {donor.user?.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <button
              onClick={() => toggleAvailability(donor.id, donor.availability_status)}
              className={`w-full py-2 rounded-lg transition flex items-center justify-center gap-2 ${
                donor.availability_status
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-green-50 text-green-600 hover:bg-green-100'
              }`}
            >
              {donor.availability_status ? <FaTimes /> : <FaCheck />}
              {donor.availability_status ? 'Mark Unavailable' : 'Mark Available'}
            </button>
          </div>
        ))}
      </div>

      {donors.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FaUserMd className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-500">No donors found</p>
        </div>
      )}
    </div>
  );
};

export default AdminDonors;
