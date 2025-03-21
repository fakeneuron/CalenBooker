// frontend/src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { footerLink } from '../styles'; // Removed 'footer' since we're overriding it

// Static footer with navigation links and copyright
const Footer = () => {
  return (
    <footer className="w-full p-4 bg-pink-100 text-center border-t border-purple-200"> {/* Overrides 'footer' from styles.js */}
      <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-6">
        <Link to="/terms" className={footerLink}>Terms of Service</Link>
        <Link to="/privacy" className={footerLink}>Privacy Policy</Link>
        <Link to="/support" className={footerLink}>Support</Link>
        <Link to="/about" className={footerLink}>About</Link>
      </div>
      <p className="text-sm text-gray-500 mt-2">© 2025 CalenBooker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;