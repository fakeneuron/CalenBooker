import React from 'react';
import { Link } from 'react-router-dom';

function LogoutSuccess() {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Successfully Logged Out</h1>
        <p className="text-lg text-gray-700">You have successfully logged out. <Link to="/login" className="text-blue-900 hover:underline">Log in again</Link></p>
      </div>
    </div>
  );
}

export default LogoutSuccess;