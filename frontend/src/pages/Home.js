import React from 'react';
import { centeredContent, heading, link } from '../styles'; // Import styles

function Home() {
  return (
    <div className={centeredContent}>
      <div className="text-center">
        <h1 className={`${heading} text-4xl text-blue-600`}>CalenBooker</h1>
        <p className="text-lg text-gray-700">Coming Soon</p>
        <div className="mt-4 space-x-4">
          <a href="/signup" className={link}>Sign Up</a>
          <a href="/login" className={link}>Log In</a>
        </div>
      </div>
    </div>
  );
}

export default Home;