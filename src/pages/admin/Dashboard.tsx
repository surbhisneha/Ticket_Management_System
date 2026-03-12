import React, { useState, useMemo } from 'react';

// Enhanced Ticket Interface
interface Ticket {
  id: string;
  subject: string;
  category: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Cleared' | 'Completed' | 'Closed';
  assignee: string;
  creator: string;
  date: string;
  attachment?: string | null;
}

// Upgraded Mock Data
const mockTickets: Ticket[] = [
  { 
    id: 'TKT-003', subject: 'Leave Approval Pending', category: 'Leave Module', description: 'My leave request for next week is still pending approval from my manager.', priority: 'Low', status: 'Closed', assignee: 'Agent B', creator: 'John Doe', date: '2026-03-10', attachment: null 
  },
  { 
    id: 'TKT-001', subject: 'Login Issue on Portal', category: 'Employee Information', description: 'I keep getting a 403 Forbidden error when trying to access my employee profile. Cleared cache but issue persists.', priority: 'High', status: 'Open', assignee: 'Unassigned', creator: 'Sarah Smith', date: '2026-03-12', attachment: 'error_screenshot.png' 
  },
  { 
    id: 'TKT-002', subject: 'Salary Slip Request', category: 'Salary/Payroll Module', description: 'I am applying for a loan and need my Feb 2026 salary slip urgently.', priority: 'Medium', status: 'In Progress', assignee: 'Agent A', creator: 'Mike Johnson', date: '2026-03-11', attachment: 'bank_request.pdf' 
  },
];

const AdminDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // Auto-sort tickets by date (newest first)
  const sortedTickets = useMemo(() => {
    return [...tickets].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [tickets]);

  const activeTicket = tickets.find(t => t.id === selectedTicketId);

  const handleUpdateTicket = (id: string, field: keyof Ticket, value: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, [field]: value } : ticket
    ));
  };

  // Helper functions for UI Colors
  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'High': return 'text-red-700 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Low': return 'text-gray-700 bg-gray-50 border-gray-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Open': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'In Progress': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Closed': case 'Completed': return 'text-green-700 bg-green-50 border-green-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 relative">
      
      {/* Top Metrics Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Tickets</span>
          <span className="text-3xl font-black text-gray-800 mt-2">{tickets.length}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm flex flex-col">
          <span className="text-blue-500 text-sm font-bold uppercase tracking-wider">Open Status</span>
          <span className="text-3xl font-black text-blue-700 mt-2">{tickets.filter(t => t.status === 'Open').length}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm flex flex-col">
          <span className="text-red-500 text-sm font-bold uppercase tracking-wider">High Priority</span>
          <span className="text-3xl font-black text-red-700 mt-2">{tickets.filter(t => t.priority === 'High').length}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-orange-100 shadow-sm flex flex-col">
          <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">Unassigned</span>
          <span className="text-3xl font-black text-orange-700 mt-2">{tickets.filter(t => t.assignee === 'Unassigned').length}</span>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h1 className="text-xl font-extrabold text-gray-800">Helpdesk Queue</h1>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">Ticket Details</th>
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {sortedTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-blue-50/30 transition-colors group">
                  
                  {/* Subject & ID */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">{ticket.subject}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{ticket.id}</span>
                        <span className="text-xs text-gray-400">• {new Date(ticket.date).toLocaleDateString()}</span>
                        {ticket.attachment && (
                          <span title="Has attachment">📎</span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Priority Dropdown */}
                  <td className="px-6 py-4">
                    <select 
                      value={ticket.priority} 
                      onChange={(e) => handleUpdateTicket(ticket.id, 'priority', e.target.value)}
                      className={`text-xs font-bold rounded-lg px-3 py-1.5 border appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${getPriorityStyle(ticket.priority)}`}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-6 py-4">
                    <select 
                      value={ticket.status} 
                      onChange={(e) => handleUpdateTicket(ticket.id, 'status', e.target.value)}
                      className={`text-xs font-bold rounded-lg px-3 py-1.5 border appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${getStatusStyle(ticket.status)}`}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Cleared">Cleared</option>
                      <option value="Completed">Completed</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>

                  {/* Assignee Dropdown */}
                  <td className="px-6 py-4">
                    <select 
                      value={ticket.assignee} 
                      onChange={(e) => handleUpdateTicket(ticket.id, 'assignee', e.target.value)}
                      className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none hover:bg-gray-100 transition-colors"
                    >
                      <option value="Unassigned">Unassigned</option>
                      <option value="Agent A">Agent A</option>
                      <option value="Agent B">Agent B</option>
                      <option value="Agent C">Agent C</option>
                    </select>
                  </td>

                  {/* View Details Button */}
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-all"
                    >
                      View Ticket
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Ticket Detail Panel */}
      {activeTicket && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedTicketId(null)}
          ></div>

          {/* Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300 border-l border-gray-200">
            
            {/* Panel Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{activeTicket.id}</span>
                <h2 className="text-xl font-extrabold text-gray-900 mt-2">{activeTicket.subject}</h2>
              </div>
              <button onClick={() => setSelectedTicketId(null)} className="p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-600 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Creator</label>
                  <p className="text-sm font-bold text-gray-800">{activeTicket.creator}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Created On</label>
                  <p className="text-sm font-bold text-gray-800">{new Date(activeTicket.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Category</label>
                  <p className="text-sm font-bold text-gray-800">{activeTicket.category}</p>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Description */}
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-2">Description</label>
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm text-gray-700 leading-relaxed">
                  {activeTicket.description}
                </div>
              </div>

              {/* Attachments */}
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-2">Attachments</label>
                {activeTicket.attachment ? (
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white hover:border-blue-400 cursor-pointer transition-colors group">
                    <span className="text-xl">📎</span>
                    <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600">{activeTicket.attachment}</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic font-medium">No attachments provided.</p>
                )}
              </div>
            </div>

            {/* Panel Footer Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1 block">Update Priority</label>
                  <select 
                    value={activeTicket.priority}
                    onChange={(e) => handleUpdateTicket(activeTicket.id, 'priority', e.target.value)}
                    className="w-full text-sm font-bold rounded-xl px-4 py-2.5 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1 block">Assign Agent</label>
                  <select 
                    value={activeTicket.assignee}
                    onChange={(e) => handleUpdateTicket(activeTicket.id, 'assignee', e.target.value)}
                    className="w-full text-sm font-bold rounded-xl px-4 py-2.5 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Agent A">Agent A</option>
                    <option value="Agent B">Agent B</option>
                    <option value="Agent C">Agent C</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTicketId(null)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-lg shadow-blue-200"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;