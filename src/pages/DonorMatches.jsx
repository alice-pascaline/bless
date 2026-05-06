import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaCheck, FaTimes, FaClock, FaHandshake, FaTint } from 'react-icons/fa';
import { acceptMatch, declineMatch, getDonorMatches } from '../services/matchService';
import { createDonation } from '../services/donationService';

const DonorMatches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const data = await getDonorMatches();
      setMatches(data.data || data || []);
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await acceptMatch(id);
      fetchMatches();
    } catch (error) {
      console.error('Failed to accept match:', error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await declineMatch(id);
      fetchMatches();
    } catch (error) {
      console.error('Failed to decline match:', error);
    }
  };

  const handleDonate = async (matchId, match) => {
    try {
      await createDonation({ request_id: match.request_id?._id });
      alert('Donation created successfully!');
      fetchMatches();
    } catch (error) {
      console.error('Failed to create donation:', error);
      alert('Failed to create donation');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'suggested': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Matches</h1>

      {matches.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FaHandshake className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-500">No matches found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <div key={match._id || match.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Blood Request #{match.request_id?._id?.slice(0, 8) || 'N/A'}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(match.match_status)}`}>
                      {match.match_status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Blood Type</p>
                      <p className="font-semibold flex items-center gap-1">
                        <FaTint className="text-red-600" /> {match.request_id?.blood_type || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-semibold">{match.request_id?.quantity || 'N/A'} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Urgency</p>
                      <p className="font-semibold capitalize">{match.request_id?.urgency_level || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Patient</p>
                      <p className="font-semibold">{match.request_id?.patient_name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hospital</p>
                      <p className="font-semibold">{match.request_id?.hospital_id?.user_id?.name || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {match.match_status === 'suggested' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(match._id || match.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                    >
                      <FaCheck /> Accept
                    </button>
                    <button
                      onClick={() => handleDecline(match._id || match.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                    >
                      <FaTimes /> Decline
                    </button>
                  </div>
                )}

                {match.match_status === 'accepted' && (
                  <button
                    onClick={() => handleDonate(match._id || match.id, match)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <FaTint /> Donate
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

export default DonorMatches;
