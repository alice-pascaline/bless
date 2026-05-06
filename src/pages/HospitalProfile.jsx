import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaHospital, FaMapMarkerAlt, FaPhone, FaEdit, FaCheck } from 'react-icons/fa';
import { updateHospitalProfile } from '../services/hospitalService';

const HospitalProfile = () => {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    hospital_name: '',
    address: '',
    contact_number: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user?.Hospital) {
      setFormData({
        hospital_name: user.Hospital.hospital_name || '',
        address: user.Hospital.address || '',
        contact_number: user.Hospital.contact_number || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = await updateHospitalProfile(formData);
      setUser({ ...user, Hospital: data.data || data });
      setMessage('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Hospital Profile</h1>
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
            <FaHospital className="text-white text-4xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user?.Hospital?.hospital_name || user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Hospital
            </span>
          </div>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
              <div className="relative">
                <FaHospital className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="hospital_name"
                  value={formData.hospital_name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
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
              <p className="text-sm text-gray-500 mb-1">Hospital Name</p>
              <p className="text-lg font-semibold flex items-center gap-2">
                <FaHospital className="text-red-600" /> {user?.Hospital?.hospital_name || 'Not set'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Contact Number</p>
              <p className="text-lg font-semibold flex items-center gap-2">
                <FaPhone className="text-red-600" /> {user?.Hospital?.contact_number || 'Not set'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Address</p>
              <p className="text-lg font-semibold flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-600" /> {user?.Hospital?.address || 'Not set'}
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

export default HospitalProfile;
