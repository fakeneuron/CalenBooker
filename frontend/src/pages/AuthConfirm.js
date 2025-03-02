import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import { container, heading, subText } from '../styles'; // Import styles

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
    <div className={container}>
      <h2 className={heading}>Confirming Your Account...</h2>
      <p className={subText}>Please wait while we verify your email.</p>
    </div>
  );
};

export default AuthConfirm;