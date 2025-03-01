import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';

const MeetingConfirmation = () => {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const { data: meetingData, error: meetingError } = await supabase
          .from('meetings')
          .select('client_name, client_email, meeting_date, meeting_time, duration, user_id')
          .eq('id', id)
          .single();
        if (meetingError) throw meetingError;
        if (!meetingData) throw new Error('Meeting not found');

        const { data: businessData, error: businessError } = await supabase
          .from('business_profile')
          .select('business_name, address, unit, city, province, postal_code, phone')
          .eq('user_id', meetingData.user_id);
        if (businessError) throw businessError;

        setMeeting(meetingData);
        setBusiness(businessData && businessData.length > 0 ? businessData[0] : null);
      } catch (err) {
        setError('Failed to load meeting details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingDetails();
  }, [id]);

  const handleICalendarDownload = () => {
    if (!meeting || !business) {
      setError('Meeting or business data missing.');
      return;
    }

    const startDate = new Date(`${meeting.meeting_date}T${meeting.meeting_time}`);
    const endDate = new Date(startDate.getTime() + meeting.duration * 60 * 1000);
    
    // Format dates for iCalendar (YYYYMMDDTHHMMSSZ)
    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:Appointment with ${business.business_name}`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `LOCATION:${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`,
      `DESCRIPTION:Meeting with ${meeting.client_name} (${meeting.client_email}). Contact: ${business.phone}`,
      'STATUS:CONFIRMED',
      `ORGANIZER;CN=${business.business_name}:mailto:no-reply@calenbooker.com`,
      `ATTENDEE;CN=${meeting.client_name}:mailto:${meeting.client_email}`,
      `UID:${Date.now()}@calenbooker.com`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `appointment-${meeting.meeting_date}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleGoogleCalendar = () => {
    if (!meeting || !business) {
      setError('Meeting or business data missing.');
      return;
    }

    const startDate = new Date(`${meeting.meeting_date}T${meeting.meeting_time}`);
    const endDate = new Date(startDate.getTime() + meeting.duration * 60 * 1000);
    const startStr = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endStr = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Appointment with ${business.business_name}`
    )}&dates=${startStr}/${endStr}&details=${encodeURIComponent(
      `Meeting with ${meeting.client_name} (${meeting.client_email}). Contact: ${business.phone}`
    )}&location=${encodeURIComponent(
      `${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`
    )}`;
    window.open(googleUrl, '_blank');
  };

  // Added separate function for Outlook to make future customization easier
  const handleOutlookCalendar = () => {
    // Outlook also accepts .ics files, so we'll reuse the iCalendar function
    handleICalendarDownload();
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">Loading meeting details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const businessName = business ? business.business_name : 'Business TBD';
  const location = business
    ? `${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`
    : 'To be provided';
  const phone = business ? business.phone : 'To be provided';

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Appointment Confirmed!</h2>
      <p className="mb-2">
        You're scheduled with <strong>{businessName}</strong>.
      </p>
      <div className="space-y-2">
        <p><strong>Client:</strong> {meeting.client_name} ({meeting.client_email})</p>
        <p><strong>Date:</strong> {meeting.meeting_date}</p>
        <p><strong>Time:</strong> {meeting.meeting_time}</p>
        <p><strong>Duration:</strong> {meeting.duration} minutes</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Contact:</strong> {phone}</p>
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold">Add to Your Calendar:</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleICalendarDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add to iCalendar
          </button>
          <button
            onClick={handleGoogleCalendar}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add to Google Calendar
          </button>
          <button
            onClick={handleOutlookCalendar}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add to Outlook
          </button>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Note: Please arrive 5 minutes early. Contact the business to reschedule if needed.
      </p>
    </div>
  );
};

export default MeetingConfirmation;