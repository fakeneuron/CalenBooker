import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';
import {
  container,
  errorText,
  heading,
  successBox,
  successText,
  text,
  buttonGroup,
  iconButton,
} from '../styles';

const AppointmentConfirmation = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const { data: appointmentData, error: appointmentError } = await supabase
          .from('appointments')
          .select('client_name, client_email, meeting_date, meeting_time, duration, service_type, user_id')
          .eq('id', id)
          .single();
        if (appointmentError) throw appointmentError;
        if (!appointmentData) throw new Error('Appointment not found');

        const { data: businessData, error: businessError } = await supabase
          .from('business_profile')
          .select('business_name, address, unit, city, province, postal_code, phone, time_zone')
          .eq('user_id', appointmentData.user_id);
        if (businessError) throw businessError;

        setAppointment(appointmentData);
        setBusiness(businessData && businessData.length > 0 ? businessData[0] : null);
      } catch (err) {
        setError('Failed to load appointment details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  const handleICalendarDownload = () => {
    if (!appointment || !business) {
      setError('Appointment or business data missing.');
      return;
    }

    const startDate = new Date(`${appointment.meeting_date}T${appointment.meeting_time}`);
    const endDate = new Date(startDate.getTime() + appointment.duration * 60 * 1000);

    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${appointment.service_type} with ${business.business_name}`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `LOCATION:${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`,
      `DESCRIPTION:Appointment with ${appointment.client_name} (${appointment.client_email}). Contact: ${business.phone}`,
      'STATUS:CONFIRMED',
      `ORGANIZER;CN=${business.business_name}:mailto:no-reply@calenbooker.com`,
      `ATTENDEE;CN=${appointment.client_name}:mailto:${appointment.client_email}`,
      `UID:${Date.now()}@calenbooker.com`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `appointment-${appointment.meeting_date}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleGoogleCalendar = () => {
    if (!appointment || !business) {
      setError('Appointment or business data missing.');
      return;
    }

    const startDate = new Date(`${appointment.meeting_date}T${appointment.meeting_time}`);
    const endDate = new Date(startDate.getTime() + appointment.duration * 60 * 1000);
    const startStr = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endStr = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `${appointment.service_type} with ${business.business_name}`
    )}&dates=${startStr}/${endStr}&details=${encodeURIComponent(
      `Appointment with ${appointment.client_name} (${appointment.client_email}). Contact: ${business.phone}`
    )}&location=${encodeURIComponent(
      `${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`
    )}`;
    window.open(googleUrl, '_blank');
  };

  const handleOutlookCalendar = () => {
    handleICalendarDownload();
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">Loading appointment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className={errorText}>{error}</p>
      </div>
    );
  }

  const businessName = business ? business.business_name : 'Business TBD';
  const location = business
    ? `${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`
    : 'To be provided';
  const phone = business ? business.phone : 'To be provided';
  const timeZone = business ? business.time_zone.split('/')[1].replace('_', ' ') : 'TBD';

  return (
    <div className={container}>
      <h2 className={`${heading} ${successText}`}>Appointment Confirmed!</h2>
      <p className={text}>
        You’re scheduled with <strong>{businessName}</strong>.
      </p>
      <div className="space-y-2">
        <p className={text}><strong>Service:</strong> {appointment.service_type}</p>
        <p className={text}><strong>Client:</strong> {appointment.client_name} ({appointment.client_email})</p>
        <p className={text}><strong>Date:</strong> {appointment.meeting_date}</p>
        <p className={text}><strong>Time:</strong> {appointment.meeting_time} ({timeZone})</p>
        <p className={text}><strong>Duration:</strong> {appointment.duration} minutes</p>
        <p className={text}><strong>Location:</strong> {location}</p>
        <p className={text}><strong>Contact:</strong> {phone}</p>
      </div>
      <div className={successBox}>
        <h3 className="text-lg font-semibold">Add to Your Calendar:</h3>
        <div className={`${buttonGroup} space-x-4`}>
          <button onClick={handleGoogleCalendar} className={iconButton} title="Add to Google Calendar">
            📅
          </button>
          <button onClick={handleOutlookCalendar} className={iconButton} title="Add to Outlook">
            📧
          </button>
          <button onClick={handleICalendarDownload} className={iconButton} title="Add to iCalendar">
            🗓️
          </button>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        {/* Note: Please arrive 5 minutes early. Contact the business to reschedule if needed. */}
      </p>
    </div>
  );
};

export default AppointmentConfirmation;