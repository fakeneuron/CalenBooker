import React from 'react';
import { Link } from 'react-router-dom';
import { container, heading, subText, link, sectionTitle } from '../styles';

// Static About page for CalenBooker
const About = () => {
  return (
    <div className={`${container} my-6`}>
      <h2 className={heading}>About CalenBooker</h2>
      <p className={subText}>Making scheduling simple and sweet!</p>

      <section className="mt-4">
        <h3 className={sectionTitle}>Our Mission</h3>
        <p className={subText}>
          At CalenBooker, we’re all about helping small businesses—like your friendly neighborhood barber shop—manage appointments with ease. Our goal is to save you time, keep your clients happy, and add a sprinkle of cuteness to your day. We started this journey to simplify scheduling so you can focus on what you do best!
        </p>
      </section>

      <section className="mt-4">
        <h3 className={sectionTitle}>Our Team</h3>
        <p className={subText}>
          We’re a small crew passionate about tech and small businesses. More details about our team coming soon! For now, know that we’re working hard to make CalenBooker your go-to scheduling buddy.
        </p>
      </section>

      <section className="mt-4">
        <h3 className={sectionTitle}>Get in Touch</h3>
        <p className={subText}>
          Want to learn more or say hi? Reach out via our <Link to="/support" className={link}>Support</Link> page or email us at <a href="mailto:support@calenbooker.com" className={link}>support@calenbooker.com</a> (placeholder email, to be updated later).
        </p>
      </section>
    </div>
  );
};

export default About