import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <aside className="w-72 bg-white border-r border-gray-100 h-full flex flex-col shrink-0 shadow-sm relative">
      {/* Profile Section */}
      <div className="p-8 border-b border-gray-50 bg-gray-50/30">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4 ring-4 ring-white">
            <span className="text-white text-3xl font-bold italic">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          
          <div className="text-center">
            <span className="text-xl font-extrabold text-gray-800 tracking-tight block">
              Hi, {user?.name || 'User'}
            </span>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-1 block">
              {user?.dept || 'Operations'}
            </span>
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="mt-4 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1 mx-auto"
            >
              View My Info 
              <svg className={`w-4 h-4 transition-transform ${showProfile ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Detail Preview (Toggled) */}
      {showProfile && (
        <div className="px-6 py-4 bg-blue-50/50 border-b border-blue-100 animate-in fade-in slide-in-from-top-2">
          <div className="space-y-3">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-black">Email ID</p>
              <p className="text-sm font-bold text-gray-700 truncate">{user?.email}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-black">Role Access</p>
              <p className="text-sm font-bold text-gray-700 capitalize">{user?.role}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-black">Employee Status</p>
              <p className="text-sm font-bold text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Active
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 mt-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to={`/${user?.role || 'user'}`}
              className={({ isActive }) =>
                `flex items-center px-6 py-4 rounded-xl transition-all duration-200 group ${
                  isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span className="text-lg font-bold">Helpdesk</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Decorative Branding */}
      <div className="p-8 opacity-20 select-none pointer-events-none">
        <p className="text-4xl font-black text-gray-300 italic">INDIUM</p>
      </div>
    </aside>
  );
};

export default Sidebar;