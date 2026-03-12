import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: ('admin' | 'agent' | 'user')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user } = useAuth(); // Access the full user object

  // 1. If no user is logged in at all, redirect to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // 2. If the user's role is not in the allowed list for this route
  if (!allowedRoles.includes(user.role)) {
    // Redirect them to their own correct dashboard instead of just blocking
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'agent':
        return <Navigate to="/agent" replace />;
      case 'user':
        return <Navigate to="/user" replace />;
      default:
        return <Navigate to="/auth/login" replace />;
    }
  }

  // 3. Role is authorized, show the page
  return <Outlet />;
};

export default ProtectedRoute;