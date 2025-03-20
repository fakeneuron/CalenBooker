import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import { 
  container, 
  button, 
  buttonSecondary, 
  errorText, 
  heading, 
  link, 
  successBox, 
  successText 
} from '../styles';
import FormField from '../components/FormField';

const AppointmentScheduler = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    meetingDate: '',
    meetingTime: '',
    duration: '30',
    serviceType: 'Consultation',
    customServiceType: '',
    status: 'Confirmed',
  });
  const [error, setError] = useState('');
  const [confirmationUrl, setConfirmationUrl] = useState('');

  useEffect(() => {
    const fetchRecentClient = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('appointments')
        .select('client_name, client_email')
        .eq('user_id', session.user.id)
        .order('meeting_date', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
      }

      if (data) {
        setFormData(prev => ({
          ...prev,
          clientName: data.client_name || '',
          clientEmail: data.client_email || '',
        }));
      } else {
        setFormData({
          clientName: 'John Smith',
          clientEmail: 'john.smith@example.com',
          meetingDate: '2025-03-25',
          meetingTime: '14:00',
          duration: '30',
          serviceType: 'Haircut',
          customServiceType: '',
          status: 'Confirmed',
        });
      }
    };

    fetchRecentClient();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      setError('Please log in to schedule an appointment.');
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
          Please complete your <Link to="/business-profile" className={link}>Business Profile</Link> before scheduling an appointment.
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
        .from('appointments')
        .insert({
          user_id: session.user.id,
          client_name: formData.clientName,
          client_email: formData.clientEmail,
          meeting_date: formData.meetingDate,
          meeting_time: formData.meetingTime,
          duration: parseInt(formData.duration, 10),
          service_type: serviceTypeToSave,
          status: formData.status,
        })
        .select('id')
        .single();
      if (error) throw error;

      const appointmentId = data.id;
      const url = `${window.location.origin}/appointment-confirmation/${appointmentId}`;
      setConfirmationUrl(url);
      setFormData({
        clientName: '',
        clientEmail: '',
        meetingDate: '',
        meetingTime: '',
        duration: '30',
        serviceType: 'Consultation',
        customServiceType: '',
        status: 'Confirmed',
      });
      setError('');
    } catch (error) {
      setError('Error scheduling appointment: ' + error.message);
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
      status: 'Confirmed',
    });
    setError('');
  };

  const serviceTypeOptions = [
    { value: 'Haircut', label: 'Haircut' },
    { value: 'Consultation', label: 'Consultation' },
    { value: 'Shave', label: 'Shave' },
    { value: 'Other', label: 'Other' },
  ];

  const durationOptions = [
    { value: '15', label: '15' },
    { value: '30', label: '30' },
    { value: '45', label: '45' },
    { value: '60', label: '60' },
  ];

  const statusOptions = [
    { value: 'Confirmed', label: 'Confirmed' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Cancelled', label: 'Cancelled' },
  ];

  return (
    <div className={container}>
      <h2 className={heading}>Appointment Scheduler</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          labelText="Client Name"
          required
        />
        <FormField
          type="email"
          name="clientEmail"
          value={formData.clientEmail}
          onChange={handleChange}
          labelText="Client Email"
          required
        />
        <FormField
          type="date"
          name="meetingDate"
          value={formData.meetingDate}
          onChange={handleChange}
          labelText="Appointment Date"
          required
        />
        <FormField
          type="time"
          name="meetingTime"
          value={formData.meetingTime}
          onChange={handleChange}
          labelText="Appointment Time"
          required
        />
        <FormField
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          labelText="Duration (minutes)"
          options={durationOptions}
        />
        <FormField
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          labelText="Service Type"
          required
          options={serviceTypeOptions}
        />
        {formData.serviceType === 'Other' && (
          <FormField
            type="text"
            name="customServiceType"
            value={formData.customServiceType}
            onChange={handleChange}
            labelText="Specify Other Service"
            required
            placeholder="Enter custom service type"
          />
        )}
        <FormField
          name="status"
          value={formData.status}
          onChange={handleChange}
          labelText="Status"
          required
          options={statusOptions}
        />
        {error && <p className={errorText}>{error}</p>}
        <button type="submit" className={`${button} w-full`}>
          Schedule Appointment
        </button>
        <button type="button" onClick={handleAutoPopulate} className={buttonSecondary}>
          Fill Sample Data
        </button>
      </form>
      {confirmationUrl && (
        <div className={successBox}>
          <p className={successText}>
            Appointment scheduled successfully! Share this link with your client:
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

export default AppointmentScheduler;