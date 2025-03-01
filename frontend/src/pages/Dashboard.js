import React from 'react';
import MeetingsTable from '../components/MeetingsTable';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">CalenBooker Dashboard</h2>
      <MeetingsTable />
    </div>
  );
};

export default Dashboard;