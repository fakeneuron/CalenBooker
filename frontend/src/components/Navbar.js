import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import { navbar, navbarContainer, navbarLink } from '../styles';

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
    navigate('/');
  };

  return (
    <nav className={navbar}>
      <div className={navbarContainer}>
        <div className="flex items-center space-x-2">
          <Link to="/dashboard" className="flex items-center">
            <img src="/logo.png" alt="CalenBooker Logo" className="w-8 h-8" />
          </Link>
          <Link to="/dashboard" className={`${navbarLink} text-lg font-bold`}>
            CalenBooker
          </Link>
        </div>
        <div className="space-x-4">
          <Link to="/business-profile" className={navbarLink}>
            Business Profile
          </Link>
          <Link to="/meeting-scheduler" className={navbarLink}>
            Meeting Scheduler
          </Link>
          <button onClick={handleLogout} className={navbarLink}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;