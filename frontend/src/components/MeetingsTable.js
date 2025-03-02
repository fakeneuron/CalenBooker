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
} from '../styles'; // Updated imports

const MeetingsTable = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMeetings = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          if (isMounted) setError('Please log in to view meetings.');
          return;
        }

        console.log('Fetching meetings for user ID:', session.user.id);

        const { data, error } = await supabase
          .from('meetings')
          .select('client_name, client_email, meeting_date, meeting_time, duration')
          .eq('user_id', session.user.id)
          .order('meeting_date', { ascending: true })
          .order('meeting_time', { ascending: true });

        console.log('Fetched meetings:', data);
        console.log('Fetch error:', error);

        if (error) throw error;

        if (isMounted) setMeetings(data || []);
      } catch (err) {
        if (isMounted) setError('Failed to load meetings: ' + err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMeetings();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">Loading meetings...</p>
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
          </tr>
        </thead>
        <tbody>
          {meetings.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                No meetings scheduled yet.
              </td>
            </tr>
          ) : (
            meetings.map((meeting, index) => (
              <tr key={index} className={tableRowHover}>
                <td className={tableCellLeft}>{meeting.client_name}</td>
                <td className={tableCellCenter}>{meeting.client_email}</td>
                <td className={tableCellCenter}>{meeting.meeting_date}</td>
                <td className={tableCellCenter}>{meeting.meeting_time}</td>
                <td className={tableCellCenter}>{meeting.duration}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingsTable;