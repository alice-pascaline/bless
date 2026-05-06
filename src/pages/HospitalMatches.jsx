import { useEffect, useState } from 'react';
import { FaHandshake, FaFilter, FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import { getHospitalMatches } from '../services/matchService';

const HospitalMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const data = await getHospitalMatches();
      setMatches(data.data || data || []);
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMatches = filter
    ? matches.filter(m => m.match_status === filter)
    : matches;

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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Matches</h1>

      {/* Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4">
        <FaFilter className="text-gray-400" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="suggested">Suggested</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {filteredMatches.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FaHandshake className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-500">No matches found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMatches.map((match) => (
            <div key={match.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Match #{match.id?.slice(0, 8)}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(match.match_status)}`}>
                      {match.match_status}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Donor Information</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-semibold">{match.Donor?.User?.name || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Blood Type</p>
                        <p className="font-semibold">{match.Donor?.blood_type || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold">{match.Donor?.location || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Availability</p>
                        <p className={`font-semibold ${match.Donor?.availability_status ? 'text-green-600' : 'text-gray-400'}`}>
                          {match.Donor?.availability_status ? 'Available' : 'Unavailable'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Blood Type Needed</p>
                      <p className="font-semibold">{match.BloodRequest?.blood_type || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-semibold">{match.BloodRequest?.quantity || 'N/A'} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Urgency</p>
                      <p className="font-semibold capitalize">{match.BloodRequest?.urgency_level || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalMatches;
