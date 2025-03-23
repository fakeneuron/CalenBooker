import React from 'react';
import { useParams } from 'react-router-dom';
import useAppointmentDetails from '../hooks/useAppointmentDetails';
import {
  container,
  errorText,
  heading,
  successBox,
  successText,
  text,
  calendarIcon,
  sectionTitle,
} from '../styles';
import googleCalendarIcon from '../assets/icons/google-calendar96.png';
import outlookIcon from '../assets/icons/outlook96.png';
import appleCalendarIcon from '../assets/icons/apple96.png';
import { generateICalendar, generateGoogleCalendarLink } from '../utils/appointmentUtils';

const ApptConfirmPublic = () => {
  const { code } = useParams();
  const { appt, business, message, loading, error } = useAppointmentDetails(null, code, true);

  const handleICalendarDownload = () => {
    if (!appt || !business) return null;
    const icsContent = generateICalendar(appt, business, message, []);
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `appt-${appt.meeting_date}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleGoogleCalendar = () => {
    if (!appt || !business) return;
    const googleUrl = generateGoogleCalendarLink(appt, business, message, [], true);
    window.open(googleUrl, '_blank');
  };

  const handleOutlookCalendar = () => {
    handleICalendarDownload();
  };

  if (loading) {
    return <div className={container}><p className={text}>Loading appointment details...</p></div>;
  }

  if (error) {
    return <div className={container}><p className={errorText}>{error}</p></div>;
  }

  const location = business
    ? `${business.business_name}, ${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`
    : 'To be provided';

  return (
    <div className={container}>
      <h2 className={`${heading} ${successText}`}>Appointment Confirmed!</h2>
      <p className={text}>{message}</p>
      <div className="space-y-2">
        <p className={text}><strong>Date:</strong> {appt.meeting_date}</p>
        <p className={text}><strong>Time:</strong> {appt.meeting_time}</p>
        <p className={text}><strong>Duration:</strong> {appt.duration} minutes</p>
        <p className={text}><strong>Location:</strong> {location}</p>
      </div>
      <div className={successBox}>
        <h3 className={sectionTitle}>Add to Your Calendar:</h3>
        <div className="flex space-x-4 justify-center">
          <img
            src={googleCalendarIcon}
            alt="Google Calendar"
            className={calendarIcon}
            onClick={handleGoogleCalendar}
            title="Add to Google Calendar"
          />
          <img
            src={outlookIcon}
            alt="Outlook"
            className={calendarIcon}
            onClick={handleOutlookCalendar}
            title="Add to Outlook"
          />
          <img
            src={appleCalendarIcon}
            alt="Apple Calendar"
            className={calendarIcon}
            onClick={handleICalendarDownload}
            title="Add to Apple Calendar"
          />
        </div>
      </div>
    </div>
  );
};

export default ApptConfirmPublic;