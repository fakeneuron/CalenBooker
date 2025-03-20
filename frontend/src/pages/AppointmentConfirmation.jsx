import React from 'react';
import { useParams } from 'react-router-dom';
import AppointmentConfirmationPrivate from './AppointmentConfirmationPrivate.jsx';
import AppointmentConfirmationPublic from './AppointmentConfirmationPublic.jsx';

const AppointmentConfirmation = ({ isPublic = false }) => {
  const { id, code } = useParams();

  return isPublic ? (
    <AppointmentConfirmationPublic code={code} />
  ) : (
    <AppointmentConfirmationPrivate id={id} />
  );
};

export default AppointmentConfirmation;