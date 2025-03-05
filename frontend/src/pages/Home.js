import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import {
  kawaiiHero,
  kawaiiHeading,
  kawaiiSubtext,
  kawaiiButton,
  kawaiiFeatureSection,
  kawaiiFeatureContainer,
  kawaiiFeatureCard,
  kawaiiFeatureTitle,
  featureText,
  kawaiiFooter,
  buttonGroup,
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
      {/* Hero Section */}
      <div className={kawaiiHero}>
        <h1 className={kawaiiHeading}>CalenBooker</h1>
        <p className={kawaiiSubtext}>Streamline your appointment scheduling with ease.</p>
        {view === 'buttons' ? (
          <div className={`${buttonGroup} flex-col space-y-4 md:flex-row md:space-y-0`}>
            <button onClick={() => setView('login')} className={`${kawaiiButton} bg-gray-200 text-gray-800 hover:bg-gray-300`}>
              Login
            </button>
            <button onClick={() => setView('signup')} className={kawaiiButton}>
              Get Started
            </button>
          </div>
        ) : view === 'signup-success' ? (
          <div className="text-center">
            <p className="text-green-600">Signup successful! Check your email to confirm.</p>
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

      {/* Features Section */}
      <div className={kawaiiFeatureSection}>
        <div className={kawaiiFeatureContainer}>
          <div className={`${kawaiiFeatureCard} fade-in`} style={{ animationDelay: '0.1s' }}>
            <h3 className={kawaiiFeatureTitle}>Fast Scheduling</h3>
            <p className={featureText}>Create appointments quickly with our intuitive interface.</p>
          </div>
          <div className={`${kawaiiFeatureCard} fade-in`} style={{ animationDelay: '0.3s' }}>
            <h3 className={kawaiiFeatureTitle}>Client Notifications</h3>
            <p className={featureText}>Share meeting details effortlessly with a single link.</p>
          </div>
          <div className={`${kawaiiFeatureCard} fade-in`} style={{ animationDelay: '0.5s' }}>
            <h3 className={kawaiiFeatureTitle}>Calendar Integration</h3>
            <p className={featureText}>Sync appointments with Google, Outlook, and more.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={kawaiiFooter}></div>
    </div>
  );
}

export default Home;