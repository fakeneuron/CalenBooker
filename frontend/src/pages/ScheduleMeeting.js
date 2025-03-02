import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Added import for Link
import supabase from '../supabaseClient';

const ScheduleMeeting = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    meetingDate: '',
    meetingTime: '',
    duration: '30', // Default in minutes
  });
  const [error, setError] = useState('');
  const [confirmationUrl, setConfirmationUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      setError('Please log in to schedule a meeting.');
      return;
    }

    // Check for business profile
    const { data: profileData, error: profileError } = await supabase
      .from('business_profile')
      .select('user_id')
      .eq('user_id', session.user.id)
      .single();

    if (profileError || !profileData) {
      setError(
        <span>
          Please complete your <Link to="/business-profile" className="text-blue-600 hover:underline">Business Profile</Link> before scheduling a meeting.
        </span>
      );
      return;
    }

    try {
      const { data, error } = await supabase
        .from('meetings')
        .insert({
          user_id: session.user.id,
          client_name: formData.clientName,
          client_email: formData.clientEmail,
          meeting_date: formData.meetingDate,
          meeting_time: formData.meetingTime,
          duration: parseInt(formData.duration, 10)
        })
        .select('id')
        .single();
      if (error) throw error;

      const meetingId = data.id;
      const url = `${window.location.origin}/meeting-confirmation/${meetingId}`;
      setConfirmationUrl(url);
      setFormData({
        clientName: '',
        clientEmail: '',
        meetingDate: '',
        meetingTime: '',
        duration: '30'
      });
      setError('');
    } catch (error) {
      setError('Error scheduling meeting: ' + error.message);
    }
  };

  const handleAutoPopulate = () => {
    setFormData({
      clientName: 'John Smith',
      clientEmail: 'john.smith@example.com',
      meetingDate: '2025-03-25',
      meetingTime: '14:00',
      duration: '30'
    });
    setError('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Schedule a Meeting</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Client Email</label>
          <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Meeting Date</label>
          <input
            type="date"
            name="meetingDate"
            value={formData.meetingDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Meeting Time</label>
          <input
            type="time"
            name="meetingTime"
            value={formData.meetingTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Duration (minutes)</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
            <option value="60">60</option>
          </select>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Schedule Meeting
        </button>
        <button
          type="button"
          onClick={handleAutoPopulate}
          className="w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-700 mt-2"
        >
          Fill Sample Data
        </button>
      </form>
      {confirmationUrl && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="text-green-700">
            Meeting scheduled successfully! Share this link with your client:
          </p>
          <p className="mt-2 text-blue-600 break-all">
            <a href={confirmationUrl} target="_blank" rel="noopener noreferrer">
              {confirmationUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default ScheduleMeeting;