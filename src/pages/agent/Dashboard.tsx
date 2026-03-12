import React, { useState, useMemo } from 'react';

// Enhanced Ticket Interface (Matching Admin)
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

// Expanded Mock Data for the Agent
const mockAgentTickets: Ticket[] = [
  { 
    id: 'TKT-002', subject: 'Salary Slip Request', category: 'Salary/Payroll Module', description: 'I am applying for a loan and need my Feb 2026 salary slip urgently.', priority: 'Medium', status: 'In Progress', assignee: 'Agent A', creator: 'Mike Johnson', date: '2026-03-11', attachment: 'bank_request.pdf' 
  },
  { 
    id: 'TKT-004', subject: 'System access issue', category: 'Others', description: 'VPN is throwing a 502 Bad Gateway error when I try to connect from home.', priority: 'High', status: 'Open', assignee: 'Agent A', creator: 'Sarah Smith', date: '2026-03-12', attachment: null 
  },
];

const AgentDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockAgentTickets);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // Auto-sort tickets by date (newest first)
  const sortedTickets = useMemo(() => {
    return [...tickets].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [tickets]);

  const activeTicket = tickets.find(t => t.id === selectedTicketId);

  const handleStatusChange = (id: string, newStatus: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, status: newStatus as Ticket['status'] } : ticket
    ));
  };

  // UI Color Helpers
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
      case 'Cleared': case 'Completed': case 'Closed': return 'text-green-700 bg-green-50 border-green-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 relative">
      
      {/* Top Metrics Row - Agent Specific */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">My Queue</span>
          <span className="text-3xl font-black text-gray-800 mt-2">{tickets.length}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm flex flex-col">
          <span className="text-red-500 text-sm font-bold uppercase tracking-wider">Needs Action (Open)</span>
          <span className="text-3xl font-black text-red-700 mt-2">{tickets.filter(t => t.status === 'Open').length}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-yellow-100 shadow-sm flex flex-col">
          <span className="text-yellow-500 text-sm font-bold uppercase tracking-wider">In Progress</span>
          <span className="text-3xl font-black text-yellow-700 mt-2">{tickets.filter(t => t.status === 'In Progress').length}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm flex flex-col">
          <span className="text-green-500 text-sm font-bold uppercase tracking-wider">Resolved Today</span>
          <span className="text-3xl font-black text-green-700 mt-2">{tickets.filter(t => ['Cleared', 'Completed', 'Closed'].includes(t.status)).length}</span>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h1 className="text-xl font-extrabold text-gray-800">My Assigned Tickets</h1>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">Ticket Details</th>
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {sortedTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-teal-50/30 transition-colors group">
                  
                  {/* Subject & ID */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">{ticket.subject}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">{ticket.id}</span>
                        <span className="text-xs text-gray-400">• {ticket.category}</span>
                        {ticket.attachment && <span title="Has attachment">📎</span>}
                      </div>
                    </div>
                  </td>

                  {/* Priority (Read Only for Agents) */}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 inline-flex text-xs font-bold rounded-lg border ${getPriorityStyle(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>

                  {/* Status Dropdown (Editable) */}
                  <td className="px-6 py-4">
                    <select 
                      value={ticket.status} 
                      onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                      className={`text-xs font-bold rounded-lg px-3 py-1.5 border appearance-none cursor-pointer focus:ring-2 focus:ring-teal-500 outline-none transition-colors ${getStatusStyle(ticket.status)}`}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Cleared">Cleared</option>
                    </select>
                  </td>

                  {/* View Details Button */}
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:text-teal-600 hover:border-teal-300 shadow-sm transition-all"
                    >
                      Resolve Issue
                    </button>
                  </td>

                </tr>
              ))}
              
              {tickets.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                    You have no assigned tickets. Great job!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Ticket Resolution Panel */}
      {activeTicket && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedTicketId(null)}
          ></div>

          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300 border-l border-gray-200">
            
            {/* Panel Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
              <div>
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">{activeTicket.id}</span>
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
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">User / Creator</label>
                  <p className="text-sm font-bold text-gray-800">{activeTicket.creator}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Priority</label>
                  <p className={`text-sm font-bold mt-1 inline-block px-2 py-0.5 rounded-md border ${getPriorityStyle(activeTicket.priority)}`}>
                    {activeTicket.priority}
                  </p>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Description */}
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-2">Issue Description</label>
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm text-gray-700 leading-relaxed">
                  {activeTicket.description}
                </div>
              </div>

              {/* Attachments */}
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-2">User Attachments</label>
                {activeTicket.attachment ? (
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white hover:border-teal-400 cursor-pointer transition-colors group">
                    <span className="text-xl">📎</span>
                    <span className="text-sm font-bold text-gray-700 group-hover:text-teal-600">{activeTicket.attachment}</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic font-medium">No attachments provided by user.</p>
                )}
              </div>
            </div>

            {/* Resolution Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2 block">Update Status</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleStatusChange(activeTicket.id, 'In Progress')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ${activeTicket.status === 'In Progress' ? 'bg-yellow-500 text-white border-yellow-600 shadow-md shadow-yellow-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-yellow-50 hover:text-yellow-700'}`}
                  >
                    In Progress
                  </button>
                  <button 
                    onClick={() => {
                      handleStatusChange(activeTicket.id, 'Cleared');
                      setTimeout(() => setSelectedTicketId(null), 500); // Auto-close on clear
                    }}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ${activeTicket.status === 'Cleared' ? 'bg-green-500 text-white border-green-600 shadow-md shadow-green-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-green-50 hover:text-green-700'}`}
                  >
                    Mark Cleared
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;