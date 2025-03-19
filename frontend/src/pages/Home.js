import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import {
  hero,
  heroHeading,
  heroSubtext,
  button,
  featureSection,
  featureContainer,
  featureCard,
  featureTitle,
  featureText,
  footerSection,
  buttonGroup,
  successText,
} from '../styles';

function Home() {
  const [view, setView] = useState('buttons');
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  const handleSignupSuccess = () => {
    setView('signup-success');
  };

  return (
    <div>
      <div className={hero}>
        <h1 className={heroHeading}>CalenBooker</h1>
        <p className={heroSubtext}>Streamline your appointment scheduling with ease.</p>
        {view === 'buttons' ? (
          <div className={`${buttonGroup} flex-col space-y-4 md:flex-row md:space-y-0`}>
            <button onClick={() => setView('login')} className={`${button} bg-gray-200 text-gray-800 hover:bg-gray-300`}>
              Login
            </button>
            <button onClick={() => setView('signup')} className={button}>
              Get Started
            </button>
          </div>
        ) : view === 'signup-success' ? (
          <div className="text-center">
            <p className={successText}>Signup successful! Check your email to confirm.</p>
            <button
              onClick={() => setView('buttons')}
              className="mt-4 text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Back to options
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto transition-opacity duration-300" style={{ opacity: view === 'buttons' ? 0 : 1 }}>
            {view === 'login' ? (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            ) : (
              <SignupForm onSignupSuccess={handleSignupSuccess} />
            )}
            <div className="text-center">
              <button
                onClick={() => setView('buttons')}
                className="mt-4 text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Back to options
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={featureSection}>
        <div className={featureContainer}>
          <div className={`${featureCard} fade-in`} style={{ animationDelay: '0.1s' }}>
            <h3 className={featureTitle}>Fast Scheduling</h3>
            <p className={featureText}>Create appointments quickly with our intuitive interface.</p>
          </div>
          <div className={`${featureCard} fade-in`} style={{ animationDelay: '0.3s' }}>
            <h3 className={featureTitle}>Client Notifications</h3>
            <p className={featureText}>Share meeting details effortlessly with a single link.</p>
          </div>
          <div className={`${featureCard} fade-in`} style={{ animationDelay: '0.5s' }}>
            <h3 className={featureTitle}>Calendar Integration</h3>
            <p className={featureText}>Sync appointments with Google, Outlook, and more.</p>
          </div>
        </div>
      </div>
      <div className={footerSection}></div>
    </div>
  );
}

export default Home;