// Calenbooker/frontend/src/components/MeetingsTable.js
import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

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
          .select('id, client_name, client_email, meeting_date, meeting_time, duration')
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
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Duration (min)</th>
          </tr>
        </thead>
        <tbody>
          {meetings.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                No meetings scheduled yet.
              </td>
            </tr>
          ) : (
            meetings.map((meeting) => (
              <tr key={meeting.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{meeting.id}</td>
                <td className="py-2 px-4 border-b">{meeting.client_name}</td>
                <td className="py-2 px-4 border-b">{meeting.client_email}</td>
                <td className="py-2 px-4 border-b">{meeting.meeting_date}</td>
                <td className="py-2 px-4 border-b">{meeting.meeting_time}</td>
                <td className="py-2 px-4 border-b">{meeting.duration}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingsTable;