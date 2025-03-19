import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import { container, input, button, label, subText, link } from '../styles';

const SignupForm = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [termsAgreed, setTermsAgreed] = useState(false);

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
    if (!termsAgreed) {
      alert('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    try {
      const { data: emailExists, error: checkError } = await supabase
        .rpc('check_email_exists', { email_to_check: formData.email });
      if (checkError) throw checkError;
      if (emailExists) {
        alert('Email already in use');
        return;
      }

      const redirectUrl = process.env.REACT_APP_AUTH_REDIRECT || 'http://localhost:4000/auth/confirm';
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
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
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            checked={termsAgreed}
            onChange={(e) => setTermsAgreed(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="terms" className={subText}>
            I agree to the <Link to="/terms" className={link}>Terms of Service</Link> and{' '}
            <Link to="/privacy" className={link}>Privacy Policy</Link>
          </label>
        </div>
        <button type="submit" className={`${button} w-full`} disabled={!termsAgreed}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;