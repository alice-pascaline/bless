import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaTint, FaFilter, FaHandshake, FaUser, FaHospital } from 'react-icons/fa';
import { getBloodRequests } from '../services/bloodRequestService';
import { getDonorProfile } from '../services/donorService';
import { createDonation } from '../services/donationService';

const DonorBloodRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bloodTypeFilter, setBloodTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [donating, setDonating] = useState(false);
  const [donorBloodType, setDonorBloodType] = useState('');

  useEffect(() => {
    fetchDonorProfile();
  }, []);

  const fetchDonorProfile = async () => {
    try {
      const data = await getDonorProfile();
      const bloodType = data.blood_type || '';
      setDonorBloodType(bloodType);
      setBloodTypeFilter('');
      fetchRequests({ compatible_with: bloodType });
    } catch (error) {
      console.error('Failed to fetch donor profile:', error);
      fetchRequests();
    }
  };

  const fetchRequests = async (params = {}) => {
    try {
      const data = await getBloodRequests(params);
      setRequests(data.data || data || []);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async (requestId) => {
    if (window.confirm('Are you sure you want to donate to this request?')) {
      setDonating(true);
      try {
        await createDonation({ request_id: requestId });
        alert('Donation created successfully!');
        fetchRequests();
      } catch (error) {
        console.error('Failed to create donation:', error);
        alert('Failed to create donation. Make sure your donor profile is complete.');
      } finally {
        setDonating(false);
      }
    }
  };

  const filteredRequests = requests.filter(r => {
    if (statusFilter && r.status !== statusFilter) return false;
    if (bloodTypeFilter && r.blood_type !== bloodTypeFilter) return false;
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
      case 'high': return 'text-red-600 font-bold';
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Patients Needing Blood</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4 flex-wrap">
        <FaFilter className="text-gray-400" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="">All Status</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={bloodTypeFilter}
          onChange={(e) => setBloodTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">All Blood Types</option>
          {bloodTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FaTint className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-500">No blood requests found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request._id || request.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Request #{request._id?.slice(0, 8) || request.id?.slice(0, 8)}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className={`font-medium ${getUrgencyColor(request.urgency_level)}`}>
                      {request.urgency_level} priority
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Patient</p>
                      <p className="font-semibold flex items-center gap-1">
                        <FaUser className="text-gray-400" /> {request.patient_name || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Blood Type</p>
                      <p className="font-semibold flex items-center gap-1">
                        <FaTint className="text-red-600" /> {request.blood_type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-semibold">{request.quantity} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hospital</p>
                      <p className="font-semibold flex items-center gap-1">
                        <FaHospital className="text-gray-400" /> {request.hospital_id?.user_id?.name || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-semibold">
                        {request.request_date ? new Date(request.request_date).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {request.status === 'pending' && (
                  <button
                    onClick={() => handleDonate(request._id || request.id)}
                    disabled={donating}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 disabled:bg-gray-400"
                  >
                    <FaHandshake /> Donate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorBloodRequests;
