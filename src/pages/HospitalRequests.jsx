import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTint, FaFilter, FaEye, FaCheck, FaTimes, FaUser } from 'react-icons/fa';
import { createBloodRequest, updateBloodRequest, deleteBloodRequest } from '../services/bloodRequestService';
import { getHospitalBloodRequests } from '../services/hospitalService';
import { getAvailableDonors } from '../services/donorService';

const HospitalRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [formData, setFormData] = useState({
    patient_name: '',
    blood_type: '',
    quantity: '',
    urgency_level: 'medium'
  });

  useEffect(() => {
    fetchRequests();
    fetchDonors();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getHospitalBloodRequests();
      setRequests(data.data || data || []);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDonors = async () => {
    try {
      const data = await getAvailableDonors();
      setDonors(data.data || data || []);
    } catch (error) {
      console.error('Failed to fetch donors:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBloodRequest(formData);
      setFormData({ patient_name: '', blood_type: '', quantity: '', urgency_level: 'medium' });
      setShowForm(false);
      fetchRequests();
    } catch (error) {
      console.error('Failed to create request:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateBloodRequest(id, { status });
      fetchRequests();
    } catch (error) {
      console.error('Failed to update request:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await deleteBloodRequest(id);
        fetchRequests();
      } catch (error) {
        console.error('Failed to delete request:', error);
      }
    }
  };

  const filteredRequests = requests.filter(r => {
    if (filter && r.status !== filter) return false;
    if (urgencyFilter && r.urgency_level !== urgencyFilter) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'fulfilled': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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
        <h1 className="text-3xl font-bold text-gray-800">Blood Requests</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
        >
          <FaPlus /> New Request
        </button>
      </div>

        {/* New Request Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Create New Blood Request</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                <input
                  type="text"
                  name="patient_name"
                  value={formData.patient_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                <select
                  name="blood_type"
                  value={formData.blood_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  {bloodTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (units)</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                <select
                  name="urgency_level"
                  value={formData.urgency_level}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="md:col-span-4 flex items-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4 flex-wrap">
        <FaFilter className="text-gray-400" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={urgencyFilter}
          onChange={(e) => setUrgencyFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">All Urgency</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          value={selectedBloodType}
          onChange={(e) => setSelectedBloodType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">All Blood Types</option>
          {bloodTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Available Donors Section */}
      {selectedBloodType && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Available Donors with {selectedBloodType} Blood Type</h3>
          {donors.filter(d => d.blood_type === selectedBloodType).length === 0 ? (
            <p className="text-gray-500">No available donors with this blood type</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {donors.filter(d => d.blood_type === selectedBloodType).map(donor => (
                <div key={donor._id || donor.id} className="border border-gray-200 p-4 rounded-lg">
                  <p className="font-semibold">{donor.user_id?.name || 'N/A'}</p>
                  <p className="text-sm text-gray-600">{donor.user_id?.phone || 'N/A'}</p>
                  <p className="text-sm text-red-600 font-medium">{donor.blood_type}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FaTint className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-500">No blood requests found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request._id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Request #{request._id?.slice(0, 8)}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className={`font-medium ${getUrgencyColor(request.urgency_level)}`}>
                      {request.urgency_level} priority
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Patient</p>
                      <p className="font-semibold flex items-center gap-1">
                        <FaUser className="text-gray-400" /> {request.patient_name || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Blood Type</p>
                      <p className="font-semibold">{request.blood_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-semibold">{request.quantity} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-semibold">
                        {request.request_date ? new Date(request.request_date).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {request.status === 'pending' && (
                    <button
                      onClick={() => handleUpdateStatus(request._id, 'approved')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="Approve"
                    >
                      <FaCheck />
                    </button>
                  )}
                  {request.status !== 'cancelled' && request.status !== 'fulfilled' && (
                    <button
                      onClick={() => handleDelete(request._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Cancel"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalRequests;
