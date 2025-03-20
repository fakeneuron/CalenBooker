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
  calendarIcon,
} from '../styles';

// Import icons from src/assets/icons/
import googleCalendarIcon from '../assets/icons/google-calendar96.png';
import outlookIcon from '../assets/icons/outlook96.png';
import appleCalendarIcon from '../assets/icons/apple96.png';

const AppointmentConfirmation = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [business, setBusiness] = useState(null);
  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState([]);
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
          .select('business_name, address, unit, city, province, postal_code, phone, time_zone, parking_instructions, office_directions, custom_info')
          .eq('user_id', appointmentData.user_id)
          .single();
        if (businessError) throw businessError;

        const { data: messageData, error: messageError } = await supabase
          .from('messages')
          .select('default_message')
          .eq('user_id', appointmentData.user_id)
          .eq('event_type', 'scheduled')
          .limit(1)
          .single();
        if (messageError) throw new Error('Failed to fetch confirmation message: ' + messageError.message);
        if (!messageData) throw new Error('No scheduled message found');

        setAppointment(appointmentData);
        setBusiness(businessData);
        setMessage(messageData.default_message);

        const notesArray = [];
        if (businessData?.parking_instructions) notesArray.push(`Parking: ${businessData.parking_instructions}`);
        if (businessData?.office_directions) notesArray.push(`Directions: ${businessData.office_directions}`);
        if (businessData?.custom_info) notesArray.push(`Info: ${businessData.custom_info}`);
        setNotes(notesArray);
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

    const description = [
      message,
      appointment.client_name ? `Client: ${appointment.client_name} (${appointment.client_email})` : '',
      business.phone ? `Contact: ${business.phone}` : '',
      notes.length > 0 ? '\nNotes:\n' + notes.join('\n') : ''
    ].filter(Boolean).join('\n');

    const location = `${business.business_name}, ${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${appointment.service_type} with ${business.business_name}`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
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

    const description = [
      message,
      appointment.client_name ? `Client: ${appointment.client_name} (${appointment.client_email})` : '',
      business.phone ? `Contact: ${business.phone}` : '',
      notes.length > 0 ? '\nNotes:\n' + notes.join('\n') : ''
    ].filter(Boolean).join('\n');

    const location = `${business.business_name}, ${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`;

    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `${appointment.service_type} with ${business.business_name}`
    )}&dates=${startStr}/${endStr}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(
      location
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
    ? `${business.business_name}, ${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`
    : 'To be provided';
  const phone = business ? business.phone : 'To be provided';
  const timeZone = business ? business.time_zone.split('/')[1].replace('_', ' ') : 'TBD';

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
          <h3 className="text-lg font-semibold text-gray-700">Notes</h3>
          <ul className="list-disc list-inside text-gray-600">
            {notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={successBox}>
        <h3 className="text-lg font-semibold text-center">Add to Your Calendar:</h3>
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

export default AppointmentConfirmation;