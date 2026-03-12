import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './routes/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import AdminDashboard from './pages/admin/Dashboard';
import AgentDashboard from './pages/agent/Dashboard';
import UserDashboard from './pages/user/Dashboard';
import TicketDetails from './pages/user/TicketDetails';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* Protected Routes inside Layout */}
          <Route element={<Layout />}>
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Agent Routes */}
            <Route element={<ProtectedRoute allowedRoles={['agent']} />}>
              <Route path="/agent" element={<AgentDashboard />} />
            </Route>

            {/* User Routes */}
            <Route element={<ProtectedRoute allowedRoles={['user']} />}>
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/user/ticket/:id" element={<TicketDetails />} />
            </Route>

          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;