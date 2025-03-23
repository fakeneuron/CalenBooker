import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import {
  errorText,
  table,
  tableCellCenter,
  tableCellLeft,
  tableHeader,
  tableHeaderCellCenter,
  tableHeaderCellLeft,
  tableRowHover,
  text,
  container,
  iconButton,
  overlayMessage,
} from '../styles';
import { formatEmailMessage, formatSMSMessage } from '../utils/appointmentUtils';
import { FaLink, FaEnvelope, FaSms } from 'react-icons/fa';

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [business, setBusiness] = useState(null);
  const [defaultMessage, setDefaultMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedStates, setCopiedStates] = useState({});
  const [overlayMessageText, setOverlayMessage] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          if (isMounted) setError('Please log in to view appointments.');
          return;
        }

        const { data: apptData, error: apptError } = await supabase
          .from('appointments')
          .select('id, client_name, client_email, meeting_date, meeting_time, duration, service_type, status')
          .eq('user_id', session.user.id)
          .order('meeting_date', { ascending: true })
          .order('meeting_time', { ascending: true });

        if (apptError) throw apptError;

        const apptIds = apptData.map((appt) => appt.id);
        const { data: linkData, error: linkError } = await supabase
          .from('appointment_links')
          .select('appointment_id, short_code')
          .in('appointment_id', apptIds);

        if (linkError) throw linkError;

        const appointmentsWithLinks = apptData.map((appt) => {
          const link = linkData.find((l) => l.appointment_id === appt.id);
          return { ...appt, shortLink: link ? `${window.location.host}/a/${link.short_code}` : '' };
        });

        const { data: businessData, error: businessError } = await supabase
          .from('business_profile')
          .select('business_name, address, unit, city, province, postal_code, phone, time_zone, parking_instructions, office_directions, custom_info')
          .eq('user_id', session.user.id)
          .limit(1);

        if (businessError && businessError.code !== 'PGRST116') throw businessError;

        const { data: messageData, error: messageError } = await supabase
          .from('messages')
          .select('default_message')
          .eq('user_id', session.user.id)
          .eq('event_type', 'scheduled')
          .limit(1);

        if (messageError && messageError.code !== 'PGRST116') throw messageError;

        if (isMounted) {
          setAppointments(appointmentsWithLinks || []);
          setBusiness(businessData?.[0] || null);
          setDefaultMessage(messageData?.[0]?.default_message || 'Thank you for booking with us! Your appointment is confirmed.');
        }
      } catch (err) {
        if (isMounted) setError('Failed to load appointments: ' + err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'text-green-600';
      case 'Pending':
        return 'text-yellow-600';
      case 'Cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleCopy = async (type, apptId, text) => {
    try {
      await navigator.clipboard.writeText(text);
      const messageMap = {
        web: 'Link copied to clipboard',
        email: 'Email content copied to clipboard',
        sms: 'SMS message copied to clipboard',
      };
      setOverlayMessage(messageMap[type]);
      setCopiedStates((prev) => ({ ...prev, [`${type}-${apptId}`]: true }));
      setTimeout(() => {
        setOverlayMessage(null);
        setCopiedStates((prev) => ({ ...prev, [`${type}-${apptId}`]: false }));
      }, 2000);
    } catch (err) {
      console.error(`Failed to copy ${type} message:`, err);
    }
  };

  const notes = business
    ? [
        business.parking_instructions ? `Parking: ${business.parking_instructions}` : '',
        business.office_directions ? `Directions: ${business.office_directions}` : '',
        business.custom_info ? `Info: ${business.custom_info}` : '',
      ].filter(Boolean)
    : [];

  if (loading) {
    return <div className={container}><p className={text}>Loading appointments...</p></div>;
  }

  if (error) {
    return <div className={container}><p className={errorText}>{error}</p></div>;
  }

  return (
    <div className="overflow-x-auto relative">
      <table className={table}>
        <thead className={tableHeader}>
          <tr>
            <th className={tableHeaderCellLeft}>Name</th>
            <th className={tableHeaderCellCenter}>Email</th>
            <th className={tableHeaderCellCenter}>Date</th>
            <th className={tableHeaderCellCenter}>Time</th>
            <th className={tableHeaderCellCenter}>Duration (min)</th>
            <th className={tableHeaderCellCenter}>Service Type</th>
            <th className={tableHeaderCellCenter}>Status</th>
            <th className={tableHeaderCellCenter}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr><td colSpan="8" className={`${tableCellCenter} text-gray-500`}>No appointments scheduled yet.</td></tr>
          ) : (
            appointments.map((appointment) => (
              <tr key={appointment.id} className={tableRowHover}>
                <td className={tableCellLeft}>{appointment.client_name}</td>
                <td className={tableCellCenter}>{appointment.client_email}</td>
                <td className={tableCellCenter}>{appointment.meeting_date}</td>
                <td className={tableCellCenter}>{appointment.meeting_time}</td>
                <td className={tableCellCenter}>{appointment.duration}</td>
                <td className={tableCellCenter}>{appointment.service_type}</td>
                <td className={`${tableCellCenter} ${getStatusClass(appointment.status)}`}>{appointment.status}</td>
                <td className={tableCellCenter}>
                  <div className="flex space-x-2 justify-center items-center">
                    {appointment.shortLink && (
                      <button
                        onClick={() => handleCopy('web', appointment.id, appointment.shortLink)}
                        className={iconButton}
                        title="Copy Web Link"
                      >
                        <FaLink size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleCopy('email', appointment.id, formatEmailMessage(appointment, business, defaultMessage, notes, appointment.shortLink, ''))}
                      className={iconButton}
                      title="Copy Email Content"
                    >
                      <FaEnvelope size={16} />
                    </button>
                    <button
                      onClick={() => handleCopy('sms', appointment.id, formatSMSMessage(appointment, business, defaultMessage, appointment.shortLink))}
                      className={iconButton}
                      title="Copy SMS Message"
                    >
                      <FaSms size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {overlayMessageText && (
        <div className={overlayMessage}>
          {overlayMessageText}
        </div>
      )}
    </div>
  );
};

export default AppointmentsTable;