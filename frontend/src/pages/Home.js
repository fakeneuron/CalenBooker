import React from 'react';
import { Link } from 'react-router-dom';
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
  link,
} from '../styles';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className={kawaiiHero}>
        <h1 className={kawaiiHeading}>CalenBooker</h1>
        <p className={kawaiiSubtext}>Streamline your appointment scheduling with ease.</p>
        <Link to="/signup" className={kawaiiButton}>
          Get Started
        </Link>
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
      <div className={kawaiiFooter}>
        <Link to="/login" className={`${link} text-sm`}>Log In</Link>
      </div>
    </div>
  );
}

export default Home;