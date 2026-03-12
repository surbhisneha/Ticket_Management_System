import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    // Clears the user object from Context and LocalStorage
    logout(); 
    navigate('/auth/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-8 shrink-0 w-full shadow-sm">
      {/* Branding Section */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-extrabold tracking-tighter text-gray-900">
          INDIUM
        </span>
        <div className="flex items-center gap-2 ml-4">
          <span className="w-4 h-4 bg-teal-400 rounded-br-xl rounded-tl-xl inline-block"></span>
          <span className="text-lg text-teal-500 font-semibold tracking-wide">
            Helpdesk
          </span>
        </div>
      </div>

      {/* Logout Section */}
      <div className="flex items-center">
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
          title="Logout from session"
        >
          <span className="text-lg font-bold">Logout</span>
          <svg 
            className="w-7 h-7 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;