import React from 'react';
import { Link } from 'react-router-dom';

const SignupSuccess = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Registration Successful!</h2>
      <p className="text-gray-600 mb-6">
        Please check your email to confirm your account. You’ll be able to log in once confirmed.
      </p>
      <Link
        to="/login"
        className="inline-block p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Log In
      </Link>
    </div>
  );
};

export default SignupSuccess;