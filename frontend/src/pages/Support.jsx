import React from 'react';
import { Link } from 'react-router-dom';
import { container, heading, subText, link, sectionTitle } from '../styles';

// Static Support page with contact info and FAQs
const Support = () => {
  return (
    <div className={`${container} my-6`}>
      <h2 className={heading}>Support</h2>
      <p className={subText}>We’re here to help you with CalenBooker!</p>

      <section className="mt-4">
        <h3 className={sectionTitle}>Contact Us</h3>
        <p className={subText}>
          Have a question or issue? Reach out to us at <a href="mailto:support@calenbooker.com" className={link}>support@calenbooker.com</a> (placeholder email, to be updated later). We aim to respond within 48 hours.
        </p>
      </section>

      <section className="mt-4">
        <h3 className={sectionTitle}>Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-700">How do I reset my password?</p>
            <p className={subText}>
              Use the "Forgot Password" link on the login form to receive a reset email.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Can I change my business profile after saving?</p>
            <p className={subText}>
              Yes, update it anytime from the <Link to="/business-profile" className={link}>Business Profile</Link> page.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Why isn’t my appointment link working?</p>
            <p className={subText}>
              Ensure you’ve completed your business profile and check the link format. Contact us if it persists.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <h3 className={sectionTitle}>More Help</h3>
        <p className={subText}>
          Check our <Link to="/terms" className={link}>Terms of Service</Link> and <Link to="/privacy" className={link}>Privacy Policy</Link> for additional details.
        </p>
      </section>
    </div>
  );
};

export default Support;