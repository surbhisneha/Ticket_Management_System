import React, { useState } from 'react';
import CreateTicket from './CreateTicket';

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Active' | 'Closed'>('Active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock data - replace with actual state later
  const tickets: any[] = []; 

  return (
    <div className="p-8 h-full bg-[#F9FAFB] flex flex-col gap-6">
      
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        {/* Empty space for alignment */}
        <div className="w-1/3"></div>

        {/* Tab Switcher */}
        <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm h-12">
          <button
            onClick={() => setActiveTab('Active')}
            className={`px-10 py-2 text-sm font-bold rounded-md transition-all ${
              activeTab === 'Active' 
              ? 'bg-[#2196F3] text-white shadow-md' 
              : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('Closed')}
            className={`px-10 py-2 text-sm font-bold rounded-md transition-all ${
              activeTab === 'Closed' 
              ? 'bg-[#2196F3] text-white shadow-md' 
              : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Closed
          </button>
        </div>

        {/* Action Button */}
        <div className="w-1/3 flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 border-2 border-[#2196F3] text-[#2196F3] rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors shadow-sm"
          >
            New Request
          </button>
        </div>
      </div>

      {/* Main Content Box */}
      <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center p-12 min-h-[500px]">
        {tickets.length === 0 ? (
          <div className="text-center animate-in fade-in zoom-in duration-700">
            {/* SVG Illustration - Matching your image */}
            <div className="relative mb-8 flex justify-center">
              <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-200">
                <rect x="60" y="40" width="160" height="110" rx="8" stroke="currentColor" strokeWidth="3" fill="white"/>
                <rect x="75" y="55" width="130" height="80" rx="4" fill="#F3F4F6"/>
                <circle cx="100" cy="85" r="12" stroke="currentColor" strokeWidth="2" fill="white"/>
                <path d="M85 115 C85 105 115 105 115 115" stroke="currentColor" strokeWidth="2" fill="white"/>
                <path d="M130 75 H180 M130 95 H170 M130 115 H160" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <rect x="20" y="100" width="50" height="50" rx="6" stroke="currentColor" strokeWidth="3" fill="white"/>
                <path d="M20 115 H70" stroke="currentColor" strokeWidth="2"/>
                <circle cx="45" cy="130" r="10" fill="#E5E7EB"/>
                <path d="M40 125 L50 135 M50 125 L40 135" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M120 10 H180 Q190 10 190 20 V60 H140 L120 75 V60 H120 Q110 60 110 50 V20 Q110 10 120 10Z" stroke="currentColor" strokeWidth="3" fill="#E5E7EB"/>
                <circle cx="135" cy="30" r="4" fill="white"/><circle cx="150" cy="30" r="4" fill="white"/><circle cx="165" cy="30" r="4" fill="white"/>
              </svg>
            </div>
            
            <p className="text-gray-400 text-lg font-medium tracking-tight">
              No helpdesk items found in <span className="text-blue-500 font-bold">{activeTab}</span>
            </p>
          </div>
        ) : (
          <div className="w-full h-full p-4">
            {/* Table or Ticket List goes here later */}
            <p className="text-gray-500 font-bold italic">List view enabled...</p>
          </div>
        )}
      </div>

      {/* New Request Modal Overlay */}
      {isModalOpen && (
        <CreateTicket 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default UserDashboard;