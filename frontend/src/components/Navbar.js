import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import { navbar, navbarContainer, navbarLink, navbarUserIcon, navbarDropdown, navbarDropdownItem } from '../styles';

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    console.log('Attempting logout...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      alert('Failed to log out: ' + error.message);
      return;
    }
    console.log('Logged out successfully, navigating to /');
    setIsDropdownOpen(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

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
        <div className="flex items-center space-x-4">
          <Link to="/appointment-scheduler" className={navbarLink}>
            Schedule Appointment
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className={navbarUserIcon}>
              👤
            </button>
            {isDropdownOpen && (
              <div className={navbarDropdown}>
                <Link to="/business-profile" className={navbarDropdownItem} onClick={() => setIsDropdownOpen(false)}>
                  Business Profile
                </Link>
                <button onClick={handleLogout} className={navbarDropdownItem}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;