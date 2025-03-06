import React from 'react';
import { Link } from 'react-router-dom';
import { container, heading, subText, link } from '../styles';

const Terms = () => {
  return (
    <div className={`${container} my-6`}>
      <h2 className={heading}>Terms of Service</h2>
      <p className={subText}>Last Updated: March 05, 2025</p>

      <section className="mt-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">1. Acceptance of Terms</h3>
        <p className={subText}>
          By using CalenBooker ("Service"), you agree to these Terms of Service ("Terms"). If you don’t agree, please don’t use the Service. We may update these Terms occasionally, and continued use means you accept the changes.
        </p>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">2. Use of Service</h3>
        <p className={subText}>
          You must be 18 or older to use CalenBooker. You agree to use the Service only for lawful purposes and not to: misuse it, violate others’ rights, or upload harmful content. Accounts are for individual use and can’t be shared.
        </p>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">3. Intellectual Property</h3>
        <p className={subText}>
          CalenBooker owns all content, logos, and features of the Service. You may not copy, modify, or distribute them without our permission. User content (e.g., appointments) remains yours, but you grant us a license to use it for the Service.
        </p>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">4. Termination</h3>
        <p className={subText}>
          We can suspend or terminate your account if you violate these Terms, with or without notice. You can stop using the Service anytime. Upon termination, your data may be deleted per our <Link to="/privacy" className={link}>Privacy Policy</Link>.
        </p>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">5. Disclaimers & Liability</h3>
        <p className={subText}>
          CalenBooker is provided "as is" without warranties. We’re not liable for indirect damages, loss of data, or interruptions. Use at your own risk. Some jurisdictions may not allow these limits, so they apply to the fullest extent permitted by law.
        </p>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">6. Contact Us</h3>
        <p className={subText}>
          Questions? Email us at <a href="mailto:support@calenbooker.com" className={link}>support@calenbooker.com</a>.
        </p>
      </section>
    </div>
  );
};

export default Terms;