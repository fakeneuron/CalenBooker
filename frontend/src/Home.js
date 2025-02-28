import React from 'react';

function Home() {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">CalenBooker</h1>
        <p className="text-lg text-gray-700">Coming Soon</p>
        <div className="mt-4">
          <a href="/signup" className="text-blue-900 hover:underline mr-4">Sign Up</a>
          <a href="/login" className="text-blue-900 hover:underline">Log In</a>
        </div>
      </div>
    </div>
  );
}

export default Home;