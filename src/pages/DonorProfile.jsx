import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaTint, FaMapMarkerAlt, FaEdit, FaCheck } from 'react-icons/fa';
import { updateDonorProfile } from '../services/donorService';

const DonorProfile = () => {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    blood_type: '',
    location: '',
    availability_status: true
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user?.Donor) {
      setFormData({
        blood_type: user.Donor.blood_type || '',
        location: user.Donor.location || '',
        availability_status: user.Donor.availability_status ?? true
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = await updateDonorProfile(formData);
      setUser({ ...user, Donor: data.data || data });
      setMessage('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <button
          onClick={() => setEditing(!editing)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
        >
          <FaEdit /> {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <FaCheck className="inline mr-2" />
            {message}
          </div>
        )}

        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              Donor
            </span>
          </div>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                <div className="relative">
                  <FaTint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="blood_type"
                    value={formData.blood_type}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Select blood type</option>
                    {bloodTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter location"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="availability_status"
                checked={formData.availability_status}
                onChange={handleChange}
                className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
              />
              <label className="text-sm font-medium text-gray-700">Available for donation</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Blood Type</p>
              <p className="text-lg font-semibold flex items-center gap-2">
                <FaTint className="text-red-600" /> {user?.Donor?.blood_type || 'Not set'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Location</p>
              <p className="text-lg font-semibold flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-600" /> {user?.Donor?.location || 'Not set'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Availability</p>
              <p className="text-lg font-semibold">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${user?.Donor?.availability_status ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                {user?.Donor?.availability_status ? 'Available' : 'Not Available'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="text-lg font-semibold">{user?.phone || 'Not set'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorProfile;
