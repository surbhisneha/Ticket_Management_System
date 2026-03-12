import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'user' | 'agent' | 'admin'>('user');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    
    // Simulating fetching user details based on email
    const mockName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);

    setTimeout(() => {
      // Correctly passing the full object to AuthContext
      login({ 
        name: mockName, 
        role: role,
        dept: 'Engineering', 
        email: email
      });
      
      // Navigate to the role-specific path
      navigate(`/${role}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">Sign in to INDIUM</h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {showSuccess && (
          <div className="mb-4 p-4 bg-white border-l-4 border-green-500 shadow-md rounded-r-md flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-green-100 p-1 rounded-full">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-green-800 font-semibold text-sm">Login Successful! Accessing Dashboard...</span>
          </div>
        )}

        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email" required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password" required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Login As</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="user">User / Employee</option>
                  <option value="agent">Support Agent</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need an account? <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500 underline decoration-2 underline-offset-4">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;