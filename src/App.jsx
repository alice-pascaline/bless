import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import DonorMatches from './pages/DonorMatches';
import DonorDonations from './pages/DonorDonations';
import DonorProfile from './pages/DonorProfile';
import DonorBloodRequests from './pages/DonorBloodRequests';
import HospitalDashboard from './pages/HospitalDashboard';
import HospitalRequests from './pages/HospitalRequests';
import HospitalMatches from './pages/HospitalMatches';
import HospitalProfile from './pages/HospitalProfile';
import Notifications from './pages/Notifications';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminDonors from './pages/AdminDonors';
import Landing from './pages/Landing';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Register />} />
      
      <Route path="/donor/dashboard" element={
        <ProtectedRoute allowedRoles={['donor']}>
          <Layout><DonorDashboard /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/donor/matches" element={
        <ProtectedRoute allowedRoles={['donor']}>
          <Layout><DonorMatches /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/donor/donations" element={
        <ProtectedRoute allowedRoles={['donor']}>
          <Layout><DonorDonations /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/donor/profile" element={
        <ProtectedRoute allowedRoles={['donor']}>
          <Layout><DonorProfile /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/donor/notifications" element={
        <ProtectedRoute allowedRoles={['donor']}>
          <Layout><Notifications /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/donor/requests" element={
        <ProtectedRoute allowedRoles={['donor']}>
          <Layout><DonorBloodRequests /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/hospital/dashboard" element={
        <ProtectedRoute allowedRoles={['hospital']}>
          <Layout><HospitalDashboard /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/hospital/requests" element={
        <ProtectedRoute allowedRoles={['hospital']}>
          <Layout><HospitalRequests /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/hospital/matches" element={
        <ProtectedRoute allowedRoles={['hospital']}>
          <Layout><HospitalMatches /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/hospital/profile" element={
        <ProtectedRoute allowedRoles={['hospital']}>
          <Layout><HospitalProfile /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/hospital/notifications" element={
        <ProtectedRoute allowedRoles={['hospital']}>
          <Layout><Notifications /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout><AdminDashboard /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout><AdminUsers /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin/donors" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout><AdminDonors /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
