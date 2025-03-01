import React, { useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const navigate = useNavigate();

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
      navigate('/dashboard'); // Updated redirect
    } catch (error) {
      if (error.message === 'Email not confirmed') {
        setErrorMessage('Your email isn’t confirmed yet. Please check your inbox (and spam/junk folder) for the confirmation link.');
      } else {
        setErrorMessage(error.message);
      }
      setResendMessage(''); // Clear resend message on new attempt
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
      setErrorMessage(''); // Clear error message on success
    } catch (error) {
      setResendMessage('Failed to resend confirmation email: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">CalenBooker Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {errorMessage && (
          <div className="text-sm text-red-500">
            {errorMessage}
            {errorMessage.includes('confirmed') && (
              <button
                type="button"
                onClick={handleResendConfirmation}
                className="ml-2 text-blue-600 hover:underline"
              >
                Resend Confirmation Email
              </button>
            )}
          </div>
        )}
        {resendMessage && <p className="text-sm text-green-500">{resendMessage}</p>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;