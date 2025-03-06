import React from 'react';
import { Link } from 'react-router-dom';
import { container, heading, subText, link } from '../styles';

const Privacy = () => {
  return (
    <div className={`${container} my-6`}>
      <h2 className={heading}>Privacy Policy</h2>
      <p className={subText}>Last Updated: March 05, 2025</p>

      <section className="mt-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">1. Introduction</h3>
        <p className={subText}>
          CalenBooker ("we," "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our appointment scheduling service ("Service"). Questions? Contact us at <a href="mailto:support@calenbooker.com" className={link}>support@calenbooker.com</a> (placeholder email, to be updated).
        </p>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">2. Information We Collect</h3>
        <p className={subText}>
          We collect:
          - <strong>Account Data</strong>: Email and password when you sign up.
          - <strong>Profile Data</strong>: Business name, address, phone, and time zone from your business profile.
          - <strong>Appointment Data</strong>: Client names, emails, dates, times, and service types you schedule.
          - <strong>Usage Data</strong>: How you interact with the Service (e.g., pages visited), collected automatically.
        </p>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">3. How We Use Your Information</h3>
        <p className={subText}>
          We use your data to:
          - Provide and improve the Service (e.g., scheduling appointments).
          - Send confirmation emails and appointment links.
          - Analyze usage to enhance features (anonymized where possible).
        </p>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">4. Sharing Your Information</h3>
        <p className={subText}>
          We don’t sell your data. We may share it with:
          - <strong>Service Providers</strong>: Like Supabase (our database host) to run the Service.
          - <strong>Legal Requirements</strong>: If required by law or to protect our rights.
          - Clients receive appointment details you enter.
        </p>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">5. Security</h3>
        <p className={subText}>
          We use reasonable measures (e.g., encryption via Supabase) to protect your data, but no system is 100% secure. You’re responsible for keeping your password safe.
        </p>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">6. Your Rights</h3>
        <p className={subText}>
          You can:
          - Access or update your data via your account.
          - Delete your account (data may be retained per legal needs—see <Link to="/terms" className={link}>Terms</Link>).
          - Contact us to request data removal or ask questions.
        </p>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">7. Changes</h3>
        <p className={subText}>
          We may update this policy. Check back here for the latest version.
        </p>
      </section>
    </div>
  );
};

export default Privacy;