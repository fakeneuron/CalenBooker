import React, { useState } from 'react';
import supabase from '../supabaseClient';
import { container, input, buttonPrimary, errorText, link, label } from '../styles';

const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [resendMessage, setResendMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      onLoginSuccess();
    } catch (error) {
      if (error.message === 'Email not confirmed') {
        setErrorMessage('Your email isn’t confirmed yet. Please check your inbox (and spam/junk folder) for the confirmation link.');
      } else {
        setErrorMessage(error.message);
      }
      setResendMessage('');
    }
  };

  const handleResendConfirmation = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: formData.email,
      });
      if (error) throw error;
      setResendMessage('Confirmation email resent! Check your inbox.');
      setErrorMessage('');
    } catch (error) {
      setResendMessage('Failed to resend confirmation email: ' + error.message);
    }
  };

  return (
    <div className={container}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={input}
            required
          />
        </div>
        <div>
          <label className={label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={input}
            required
          />
        </div>
        {errorMessage && (
          <div className={errorText}>
            {errorMessage}
            {errorMessage.includes('confirmed') && (
              <button
                type="button"
                onClick={handleResendConfirmation}
                className={`${link} ml-2`}
              >
                Resend Confirmation Email
              </button>
            )}
          </div>
        )}
        {resendMessage && <p className="text-green-500 text-sm">{resendMessage}</p>}
        <button type="submit" className={buttonPrimary}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;