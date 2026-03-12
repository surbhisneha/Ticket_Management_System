import React, { useState } from 'react';

interface CreateTicketProps {
  onClose?: () => void;
}

const CreateTicket: React.FC<CreateTicketProps> = ({ onClose }) => {
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ category, subject, description, file });
    if (onClose) onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    /* Changed backdrop to light grey with a blur effect */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-bold text-gray-800">New Request</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
          
          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-bold uppercase tracking-wider">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-2 border-gray-100 rounded-xl p-3 text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none text-gray-700 bg-gray-50/50 transition-all cursor-pointer"
              required
            >
              <option value="" disabled>Select Category..</option>
              <option value="Attendance Module">Attendance Module</option>
              <option value="Employee Information">Employee Information</option>
              <option value="Income Tax">Income Tax</option>
              <option value="Leave Module">Leave Module</option>
              <option value="Loans">Loans</option>
              <option value="Others">Others</option>
              <option value="Salary/Payroll Module">Salary/Payroll Module</option>
            </select>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-bold uppercase tracking-wider">
              Subject<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What is this regarding?"
              className="border-2 border-gray-100 rounded-xl p-3 text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all bg-gray-50/50"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-bold uppercase tracking-wider">
              Description<span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue in detail..."
              rows={4}
              className="border-2 border-gray-100 rounded-xl p-3 text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none resize-none transition-all bg-gray-50/50"
              required
            />
          </div>

          {/* Attachment Section */}
          <div className="p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span className="text-sm font-bold">Attach File</span>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".pdf,.xls,.xlsx,.doc,.docx,.txt,.ppt,.pptx,.gif,.jpg,.jpeg,.png"
                />
              </label>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Allowed formats</span>
                <span className="text-[11px] text-gray-500">PDF, Excel, Doc, Images</span>
              </div>
            </div>
            
            {file && (
              <div className="mt-3 flex items-center justify-between bg-blue-50 p-2 rounded-lg border border-blue-100">
                <span className="text-xs font-bold text-blue-700 truncate max-w-[400px]">📎 {file.name}</span>
                <button onClick={() => setFile(null)} className="text-blue-400 hover:text-red-500">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/></svg>
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 py-3 border-2 border-blue-500 text-blue-500 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg shadow-blue-50"
            >
              Submit Request
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-[#2196F3] text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;