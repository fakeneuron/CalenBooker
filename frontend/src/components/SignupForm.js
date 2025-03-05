import React, { useState } from 'react';
import supabase from '../supabaseClient';
import { container, input, buttonPrimary, label } from '../styles';

const SignupForm = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      const criteria = {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        special: /[@$!%*?&]/.test(value),
      };
      setPasswordCriteria(criteria);
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      setIsPasswordValid(passwordRegex.test(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      alert('Please meet all password criteria before submitting.');
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
      onSignupSuccess();
    } catch (error) {
      alert(error.message);
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
            className={`${input} ${!isPasswordValid && formData.password.length > 0 ? 'border-red-500' : ''}`}
            required
          />
          <ul className="mt-2 text-sm">
            <li className={passwordCriteria.length ? 'text-green-600' : 'text-gray-600'}>
              {passwordCriteria.length ? '✔' : '✗'} At least 8 characters
            </li>
            <li className={passwordCriteria.uppercase ? 'text-green-600' : 'text-gray-600'}>
              {passwordCriteria.uppercase ? '✔' : '✗'} One uppercase letter
            </li>
            <li className={passwordCriteria.lowercase ? 'text-green-600' : 'text-gray-600'}>
              {passwordCriteria.lowercase ? '✔' : '✗'} One lowercase letter
            </li>
            <li className={passwordCriteria.number ? 'text-green-600' : 'text-gray-600'}>
              {passwordCriteria.number ? '✔' : '✗'} One number
            </li>
            <li className={passwordCriteria.special ? 'text-green-600' : 'text-gray-600'}>
              {passwordCriteria.special ? '✔' : '✗'} One special character (e.g., @ $ ! % * ? &)
            </li>
          </ul>
        </div>
        <button type="submit" className={buttonPrimary}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;