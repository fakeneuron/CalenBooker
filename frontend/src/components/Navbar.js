import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Attempting logout...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      alert('Failed to log out: ' + error.message);
      return;
    }
    console.log('Logged out successfully, navigating to /');
    navigate('/'); // Changed to root
  };

  return (
    <nav className="bg-blue-900 p-2 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/dashboard" className="flex items-center">
            <img src="/logo.png" alt="CalenBooker Logo" className="w-8 h-8" />
          </Link>
          <Link to="/dashboard" className="text-white text-lg font-bold">
            CalenBooker
          </Link>
        </div>
        <div className="space-x-4">
          <Link to="/business-details" className="text-white hover:underline">
            Business Details
          </Link>
          <Link to="/schedule-meeting" className="text-white hover:underline">
            Schedule Meetings
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;