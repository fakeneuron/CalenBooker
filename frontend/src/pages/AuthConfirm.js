import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const AuthConfirm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthConfirm = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (session) {
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error during auth confirmation:', error.message);
        navigate('/login');
      }
    };

    handleAuthConfirm();
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Confirming Your Account...</h2>
      <p className="text-gray-600">Please wait while we verify your email.</p>
    </div>
  );
};

export default AuthConfirm;