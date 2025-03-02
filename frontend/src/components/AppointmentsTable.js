import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import {
  errorText,
  table,
  tableHeader,
  tableHeaderCellLeft,
  tableHeaderCellCenter,
  tableRowHover,
  tableCellLeft,
  tableCellCenter,
} from '../styles';

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]); // Updated variable name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAppointments = async () => { // Updated function name
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          if (isMounted) setError('Please log in to view appointments.');
          return;
        }

        console.log('Fetching appointments for user ID:', session.user.id); // Updated log

        const { data, error } = await supabase
          .from('appointments') // Will update table name in Sub-Step 3
          .select('client_name, client_email, meeting_date, meeting_time, duration, service_type, status')
          .eq('user_id', session.user.id)
          .order('meeting_date', { ascending: true })
          .order('meeting_time', { ascending: true });

        console.log('Fetched appointments:', data); // Updated log
        console.log('Fetch error:', error);

        if (error) throw error;

        if (isMounted) setAppointments(data || []); // Updated variable name
      } catch (err) {
        if (isMounted) setError('Failed to load appointments: ' + err.message); // Updated text
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAppointments();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">Loading appointments...</p> {/* Updated text */}
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

  return (
    <div className="overflow-x-auto">
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
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? ( // Updated variable name
            <tr>
              <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
                No appointments scheduled yet. {/* Updated text */}
              </td>
            </tr>
          ) : (
            appointments.map((appointment, index) => ( // Updated variable name
              <tr key={index} className={tableRowHover}>
                <td className={tableCellLeft}>{appointment.client_name}</td> {/* Updated reference */}
                <td className={tableCellCenter}>{appointment.client_email}</td> {/* Updated reference */}
                <td className={tableCellCenter}>{appointment.meeting_date}</td> {/* Updated reference */}
                <td className={tableCellCenter}>{appointment.meeting_time}</td> {/* Updated reference */}
                <td className={tableCellCenter}>{appointment.duration}</td> {/* Updated reference */}
                <td className={tableCellCenter}>{appointment.service_type}</td> {/* Updated reference */}
                <td className={`${tableCellCenter} ${getStatusClass(appointment.status)}`}>{appointment.status}</td> {/* Updated reference */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;