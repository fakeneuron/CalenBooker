import React from 'react';
import { Link } from 'react-router-dom';
import { container, heading, subText, buttonPrimary } from '../styles';

const NotFound = () => {
  return (
    <div className={`${container} my-6 text-center`}>
      <h2 className={`${heading} text-4xl`}>404 - Oopsie!</h2>
      <p className={`${subText} mt-4`}>
        Looks like we got lost in the appointment book! This page doesn’t exist.
      </p>
      <div className="mt-6">
        <Link to="/" className={`${buttonPrimary} px-6 py-2`}>
          Back to Home
        </Link>
      </div>
      <p className={`${subText} mt-4`}>
        Need help? Visit our <Link to="/support" className="text-purple-500 hover:text-purple-700 underline">Support</Link> page!
      </p>
    </div>
  );
};

export default NotFound;