import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import { container, heading, subText } from '../styles';

const AuthConfirm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthConfirm = async () => {
      try {
        // Extract tokens from URL hash (e.g., #access_token=...&refresh_token=...)
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
          // Set session with tokens
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;

          // Session should now be active, redirect to dashboard
          navigate('/dashboard');
        } else {
          // No tokens, check existing session
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          if (sessionError) throw sessionError;
          if (session) {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error during auth confirmation:', error.message);
        navigate('/');
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