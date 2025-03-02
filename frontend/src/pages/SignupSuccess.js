import React from 'react';
import { Link } from 'react-router-dom';
import { container, heading, successTextCenter, centeredButton, centered } from '../styles'; // Updated imports

const SignupSuccess = () => {
  return (
    <div className={container}>
      <h2 className={`${heading} ${successTextCenter}`}>Registration Successful!</h2>
      <p className="text-gray-600 mb-6 text-center">
        Please check your email to confirm your account. You’ll be able to log in once confirmed.
      </p>
      <div className={centered}>
        <Link to="/login" className={centeredButton}>
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignupSuccess;