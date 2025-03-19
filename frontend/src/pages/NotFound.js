import React from 'react';
import { Link } from 'react-router-dom';
import { container, heading, subText, button, link } from '../styles';

const NotFound = () => {
  return (
    <div className={`${container} my-6 text-center`}>
      <h2 className={`${heading} text-4xl`}>404 - Oopsie!</h2>
      <p className={`${subText} mt-4`}>
        Looks like we got lost in the appointment book! This page doesn’t exist.
      </p>
      <div className="mt-6">
        <Link to="/" className={button}>
          Back to Home
        </Link>
      </div>
      <p className={`${subText} mt-4`}>
        Need help? Visit our <Link to="/support" className={link}>Support</Link> page!
      </p>
    </div>
  );
};

export default NotFound;