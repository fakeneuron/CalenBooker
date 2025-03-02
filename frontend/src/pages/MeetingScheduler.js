import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import {
  container,
  input,
  buttonPrimary,
  buttonSecondary,
  errorText,
  heading,
  link,
  successBox,
  successText,
  label,
} from '../styles';

const MeetingScheduler = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    meetingDate: '',
    meetingTime: '',
    duration: '30', // Default in minutes
    serviceType: 'Consultation', // Default service type
    customServiceType: '',
    status: 'Confirmed', // Default status
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

    const { data: profileData, error: profileError } = await supabase
      .from('business_profile')
      .select('user_id')
      .eq('user_id', session.user.id)
      .single();

    if (profileError || !profileData) {
      setError(
        <span>
          Please complete your <Link to="/business-profile" className={link}>Business Profile</Link> before scheduling a meeting.
        </span>
      );
      return;
    }

    try {
      const serviceTypeToSave = formData.serviceType === 'Other' ? formData.customServiceType : formData.serviceType;
      if (formData.serviceType === 'Other' && !formData.customServiceType) {
        setError('Please specify a service type for "Other".');
        return;
      }

      const { data, error } = await supabase
        .from('meetings')
        .insert({
          user_id: session.user.id,
          client_name: formData.clientName,
          client_email: formData.clientEmail,
          meeting_date: formData.meetingDate,
          meeting_time: formData.meetingTime,
          duration: parseInt(formData.duration, 10),
          service_type: serviceTypeToSave,
          status: formData.status, // Added status
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
        duration: '30',
        serviceType: 'Consultation',
        customServiceType: '',
        status: 'Confirmed', // Reset to default
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
      duration: '30',
      serviceType: 'Haircut',
      customServiceType: '',
      status: 'Confirmed', // Default for sample
    });
    setError('');
  };

  return (
    <div className={container}>
      <h2 className={heading}>Meeting Scheduler</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={label}>Client Name</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className={input}
            required
          />
        </div>
        <div>
          <label className={label}>Client Email</label>
          <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            className={input}
            required
          />
        </div>
        <div>
          <label className={label}>Meeting Date</label>
          <input
            type="date"
            name="meetingDate"
            value={formData.meetingDate}
            onChange={handleChange}
            className={input}
            required
          />
        </div>
        <div>
          <label className={label}>Meeting Time</label>
          <input
            type="time"
            name="meetingTime"
            value={formData.meetingTime}
            onChange={handleChange}
            className={input}
            required
          />
        </div>
        <div>
          <label className={label}>Duration (minutes)</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className={input}
          >
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
            <option value="60">60</option>
          </select>
        </div>
        <div>
          <label className={label}>Service Type</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className={input}
            required
          >
            <option value="Haircut">Haircut</option>
            <option value="Consultation">Consultation</option>
            <option value="Shave">Shave</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {formData.serviceType === 'Other' && (
          <div>
            <label className={label}>Specify Other Service</label>
            <input
              type="text"
              name="customServiceType"
              value={formData.customServiceType}
              onChange={handleChange}
              className={input}
              required
              placeholder="Enter custom service type"
            />
          </div>
        )}
        <div>
          <label className={label}>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={input}
            required
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        {error && <p className={errorText}>{error}</p>}
        <button type="submit" className={buttonPrimary}>
          Schedule Meeting
        </button>
        <button type="button" onClick={handleAutoPopulate} className={buttonSecondary}>
          Fill Sample Data
        </button>
      </form>
      {confirmationUrl && (
        <div className={successBox}>
          <p className={successText}>
            Meeting scheduled successfully! Share this link with your client:
          </p>
          <p className="mt-2 text-blue-600 break-all">
            <a href={confirmationUrl} target="_blank" rel="noopener noreferrer" className={link}>
              {confirmationUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default MeetingScheduler;