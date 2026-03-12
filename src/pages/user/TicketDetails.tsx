import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock ticket data for demonstration
const mockTicket = {
  id: 'TKT-1234',
  subject: 'Need access to Attendance Module',
  category: 'Attendance Module',
  priority: 'High',
  status: 'In Progress',
  description: 'Hi, I am unable to access the attendance module since yesterday. It shows an "Access Denied" error. Please look into this.',
  date: '2026-03-12',
  assignee: 'Agent A',
  attachments: ['error_screenshot.png']
};

const TicketDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch the ticket details using the 'id' parameter

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link to="/user" className="text-gray-500 hover:text-blue-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">
            Ticket {id || mockTicket.id}
          </h1>
        </div>
        <div className="flex gap-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {mockTicket.status}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            mockTicket.priority === 'High' ? 'bg-red-100 text-red-800' : 
            mockTicket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {mockTicket.priority} Priority
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-900 mb-2">{mockTicket.subject}</h2>
          <div className="flex gap-4 text-sm text-gray-500 mb-6">
            <span>Category: <span className="text-gray-900 font-medium">{mockTicket.category}</span></span>
            <span>•</span>
            <span>Created: <span className="text-gray-900 font-medium">{mockTicket.date}</span></span>
            <span>•</span>
            <span>Assignee: <span className="text-gray-900 font-medium">{mockTicket.assignee}</span></span>
          </div>
          
          <div className="prose max-w-none text-gray-700">
            <p className="whitespace-pre-wrap">{mockTicket.description}</p>
          </div>

          {mockTicket.attachments.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Attachments</h3>
              <div className="flex gap-3">
                {mockTicket.attachments.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-blue-600 hover:bg-gray-100 cursor-pointer transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    {file}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Comments/Reply Section */}
        <div className="p-6 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Add a Reply</h3>
          <textarea 
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y min-h-[100px]"
            placeholder="Type your message here..."
          ></textarea>
          <div className="mt-3 flex justify-end">
            <button className="px-6 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;