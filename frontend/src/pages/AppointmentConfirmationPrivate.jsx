import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAppointmentDetails from '../hooks/useAppointmentDetails';
import {
  container,
  errorText,
  heading,
  successText,
  text,
  messageBox,
  copyIcon,
  copiedText,
  sectionTitle,
  notesList,
  shortLink,
  messageText,
} from '../styles';
import { formatEmailMessage, formatSMSMessage } from '../utils/appointmentUtils';
import { FaCopy } from 'react-icons/fa'; // Using react-icons for the copy icon

const AppointmentConfirmationPrivate = () => {
  const { id } = useParams();
  const { appointment, business, message, notes, shortLink, loading, error } = useAppointmentDetails(id, null, false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [smsCopied, setSMSCopied] = useState(false);
  const [icsUrl] = useState(''); // Kept for email format compatibility

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(formatEmailMessage(appointment, business, message, notes, shortLink, icsUrl));
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email message:', err);
    }
  };

  const handleCopySMS = async () => {
    try {
      await navigator.clipboard.writeText(formatSMSMessage(appointment, business, message, shortLink));
      setSMSCopied(true);
      setTimeout(() => setSMSCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy SMS message:', err);
    }
  };

  if (loading) {
    return <div className={container}><p className={text}>Loading appointment details...</p></div>;
  }

  if (error) {
    return <div className={container}><p className={errorText}>{error}</p></div>;
  }

  const businessName = business ? business.business_name : 'Business TBD';
  const location = business
    ? `${business.business_name}, ${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`
    : 'To be provided';
  const phone = business ? business.phone : 'To be provided';
  const timeZone = business ? business.time_zone.split('/')[1].replace('_', ' ') : 'TBD';

  const emailMessage = formatEmailMessage(appointment, business, message, notes, shortLink, icsUrl).replace('View Details:', 'Add to calendar:');
  const smsMessage = formatSMSMessage(appointment, business, message, shortLink);

  return (
    <div className={container}>
      <h2 className={`${heading} ${successText}`}>Appointment Confirmed!</h2>
      <p className={text}>{message}</p>
      <div className="space-y-2">
        <p className={text}><strong>Service:</strong> {appointment.service_type}</p>
        <p className={text}><strong>Client:</strong> {appointment.client_name} ({appointment.client_email})</p>
        <p className={text}><strong>Date:</strong> {appointment.meeting_date}</p>
        <p className={text}><strong>Time:</strong> {appointment.meeting_time} ({timeZone})</p>
        <p className={text}><strong>Duration:</strong> {appointment.duration} minutes</p>
        <p className={text}><strong>Location:</strong> {location}</p>
        <p className={text}><strong>Contact:</strong> {phone}</p>
      </div>
      {notes.length > 0 && (
        <div className="mt-4">
          <h3 className={sectionTitle}>Notes</h3>
          <ul className={notesList}>
            {notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-6 relative">
        <h3 className={sectionTitle}>Email-Friendly Format:</h3>
        <div className={messageBox}>
          <pre className={messageText}>
            {emailMessage.split('\n').map((line, index) => (
              line.startsWith('Add to calendar:') && shortLink ? (
                <span key={index}>
                  Add to calendar:{' '}
                  <a
                    href={`http://${shortLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${shortLink} !text-blue-600`}
                  >
                    {shortLink}
                  </a>
                </span>
              ) : (
                line
              )
            )).reduce((prev, curr, index) => index === 0 ? [curr] : [...prev, '\n', curr], [])}
          </pre>
          <FaCopy className={copyIcon} onClick={handleCopyEmail} title="Copy to Clipboard" />
          {emailCopied && <span className={copiedText}>Copied!</span>}
        </div>
      </div>
      <div className="mt-4 relative">
        <h3 className={sectionTitle}>SMS-Friendly Format:</h3>
        <div className={messageBox}>
          <p className={text}>
            {smsMessage.split(' ').map((word, index) => (
              word === shortLink ? (
                <a
                  key={index}
                  href={`http://${shortLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${shortLink} !text-blue-600`}
                >
                  {word}
                </a>
              ) : (
                `${word} `
              )
            ))}
          </p>
          <FaCopy className={copyIcon} onClick={handleCopySMS} title="Copy to Clipboard" />
          {smsCopied && <span className={copiedText}>Copied!</span>}
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmationPrivate;