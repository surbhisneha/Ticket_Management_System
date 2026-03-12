import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-[#F3F4F6] overflow-hidden">
      {/* Sidebar - Your dynamic, styled sidebar */}
      <Sidebar />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header - The enlarged header with Logout */}
        <Header />

        {/* Dashboard Slot */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-[1600px] mx-auto h-full">
            {/* This renders UserDashboard, AdminDashboard, etc. */}
            <Outlet /> 
          </div>
        </main>

        {/* Standard Footer */}
        <footer className="h-12 bg-white border-t border-gray-200 flex items-center justify-center gap-4 text-[11px] text-gray-400 shrink-0 font-medium">
          <span>main-1986</span>
          <span className="text-gray-200">|</span>
          <button className="hover:text-blue-600 transition-colors">Privacy Policy</button>
          <span className="text-gray-200">|</span>
          <button className="hover:text-blue-600 transition-colors">Terms Of Service</button>
        </footer>
      </div>
    </div>
  );
};

export default Layout;