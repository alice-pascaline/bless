import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaTint, FaSignOutAlt, FaBars, FaTimes, FaBell } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getUnreadCount } from '../services/notificationService';
import ThemeToggle from '../components/ThemeToggle';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUnreadCount();
    }
  }, [user]);

  const fetchUnreadCount = async () => {
    try {
      const data = await getUnreadCount();
      setUnreadCount(data.count);
    } catch (error) {
      console.error('Failed to fetch unread count');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const donorLinks = [
    { path: '/donor/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/donor/requests', label: 'Patient Requests', icon: '🩸' },
    { path: '/donor/matches', label: 'My Matches', icon: '🤝' },
    { path: '/donor/donations', label: 'My Donations', icon: '💉' },
    { path: '/donor/profile', label: 'Profile', icon: '👤' },
  ];

  const hospitalLinks = [
    { path: '/hospital/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/hospital/requests', label: 'Blood Requests', icon: '🩸' },
    { path: '/hospital/matches', label: 'Matches', icon: '🤝' },
    { path: '/hospital/profile', label: 'Profile', icon: '🏥' },
  ];

  const links = user?.role === 'donor' ? donorLinks : hospitalLinks;

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top Navbar */}
      <nav className={`${isDark ? 'bg-gray-800 shadow-gray-700' : 'bg-white shadow-sm'} fixed w-full top-0 z-50 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`md:hidden p-2 rounded-md ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
              <Link to="/" className="flex items-center gap-2 ml-2">
                <FaTint className="text-red-600 text-2xl" />
                <span className={`font-bold text-xl ${isDark ? 'text-white' : 'text-gray-800'}`}>BloodDonor</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                to={user?.role === 'donor' ? '/donor/notifications' : '/hospital/notifications'}
                className={`relative p-2 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <FaBell className="text-xl" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className={`hidden md:block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className={`p-2 ${isDark ? 'text-gray-300 hover:text-red-400' : 'text-gray-600 hover:text-red-600'} transition`}
                title="Logout"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 w-64 ${isDark ? 'bg-gray-800 shadow-gray-700' : 'bg-white shadow-sm'} transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-200 ease-in-out pt-16 md:pt-0`}
        >
          <nav className="p-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(link.path)
                    ? 'bg-red-50 text-red-600 font-medium'
                    : isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-6 md:p-8 max-w-7xl ${isDark ? 'text-gray-100' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
