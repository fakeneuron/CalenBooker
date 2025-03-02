import React, { useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { container, input, buttonPrimary, errorText, heading, link, label } from '../styles';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(value)) {
        setPasswordError(
          'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.'
        );
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      alert(passwordError);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users_view')
        .select('email')
        .eq('email', formData.email);

      if (error) throw error;
      if (data.length > 0) {
        alert('Email already in use');
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.REACT_APP_AUTH_REDIRECT || 'http://localhost:4000/auth/confirm',
        },
      });

      if (signUpError) throw signUpError;
      navigate('/signup-success');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={container}>
      <h2 className={heading}>CalenBooker Signup</h2>
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
            className={`${input} ${passwordError ? 'border-red-500' : ''}`}
            required
          />
          {passwordError && <p className={errorText}>{passwordError}</p>}
        </div>
        <button type="submit" className={buttonPrimary}>
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className={link}>
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;