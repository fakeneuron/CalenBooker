// Calenbooker/frontend/src/pages/MeetingConfirmation.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';

const MeetingConfirmation = () => {
  const { id } = useParams(); // Get meeting ID from URL
  const [meeting, setMeeting] = useState(null);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        // Fetch meeting details
        const { data: meetingData, error: meetingError } = await supabase
          .from('meetings')
          .select('client_name, client_email, meeting_date, meeting_time, duration, user_id')
          .eq('id', id)
          .single();
        if (meetingError) throw meetingError;
        if (!meetingData) throw new Error('Meeting not found');

        // Fetch business details
        const { data: businessData, error: businessError } = await supabase
          .from('business_profile')
          .select('business_name, address, unit, city, province, postal_code, phone')
          .eq('user_id', meetingData.user_id)
          .single();
        if (businessError) throw businessError;

        setMeeting(meetingData);
        setBusiness(businessData);
      } catch (err) {
        setError('Failed to load meeting details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingDetails();
  }, [id]);

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

  const location = `${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Appointment Confirmed!</h2>
      <p className="mb-2">
        You’re scheduled with <strong>{business.business_name}</strong>.
      </p>
      <div className="space-y-2">
        <p><strong>Client:</strong> {meeting.client_name} ({meeting.client_email})</p>
        <p><strong>Date:</strong> {meeting.meeting_date}</p>
        <p><strong>Time:</strong> {meeting.meeting_time}</p>
        <p><strong>Duration:</strong> {meeting.duration} minutes</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Contact:</strong> {business.phone}</p>
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold">Add to Your Calendar:</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add to iCalendar
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add to Google Calendar
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
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