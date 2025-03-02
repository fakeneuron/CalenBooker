import React from 'react';
import MeetingsTable from '../components/MeetingsTable';
import { wideContainer, heading } from '../styles'; // Use wideContainer

const Dashboard = () => {
  return (
    <div className={wideContainer}>
      <h2 className={heading}>CalenBooker Dashboard</h2>
      <MeetingsTable />
    </div>
  );
};

export default Dashboard;