import React from 'react';
import AppointmentsTable from '../components/AppointmentsTable'; // Updated import
import { wideContainer, heading } from '../styles';

const Dashboard = () => {
  return (
    <div className={wideContainer}>
      <h2 className={heading}>CalenBooker Dashboard</h2>
      <AppointmentsTable />
    </div>
  );
};

export default Dashboard;