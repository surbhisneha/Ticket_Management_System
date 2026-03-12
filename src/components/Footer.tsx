import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6 mt-auto">
      <div className="flex justify-center items-center text-sm text-gray-500 space-x-2">
        <span>main-1986</span>
        <span>|</span>
        <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
        <span>|</span>
        <a href="#" className="hover:text-blue-600 transition-colors">Terms Of Service</a>
      </div>
    </footer>
  );
};

export default Footer;