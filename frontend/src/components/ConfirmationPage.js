import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Full location object:', location);
    const hashParams = new URLSearchParams(location.hash.substring(1));
    console.log('Hash params:', Object.fromEntries(hashParams));
    
    const accessToken = hashParams.get('access_token');
    const errorCode = hashParams.get('error_code');
    const errorDesc = hashParams.get('error_description');

    if (errorCode) {
      setError(`Confirmation failed: ${errorDesc} (Code: ${errorCode})`);
      return;
    }

    if (accessToken) {
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        console.log('Decoded JWT payload:', payload);
        setUserId(payload.sub);
      } catch (err) {
        console.error('Error decoding token:', err.message);
        setError('Invalid confirmation link');
      }
    } else {
      setError('No access token found in confirmation link');
    }
  }, [location]);

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Error</h2>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Account Confirmed!</h2>
      <p className="text-gray-700">Your account has been successfully confirmed.</p>
      {userId ? (
        <Link
          to={`/business-details?user_id=${userId}`}
          className="mt-4 inline-block p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Business Details
        </Link>
      ) : (
        <p className="text-gray-500">Loading user details...</p>
      )}
    </div>
  );
};

export default ConfirmationPage;