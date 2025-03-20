// Utility functions for formatting appointment details
const formatEmailMessage = (appointment, business, message, notes, shortLink, icsUrl) => {
    if (!appointment || !business) return 'Appointment data missing.';
    const timeZone = business.time_zone.split('/')[1].replace('_', ' ');
    const location = `${business.business_name}, ${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`;
    const emailMessage = [
      message,
      `Service: ${appointment.service_type}`,
      `Client: ${appointment.client_name} (${appointment.client_email})`,
      `Date: ${appointment.meeting_date}`,
      `Time: ${appointment.meeting_time} (${timeZone})`,
      `Duration: ${appointment.duration} minutes`,
      `Location: ${location}`,
      `Contact: ${business.phone || 'Not provided'}`,
      notes.length > 0 ? 'Notes:\n' + notes.join('\n') : '',
      shortLink ? `View Details: ${shortLink}` : '',
      icsUrl ? `Add to Calendar: ${icsUrl}` : '',
    ].filter(Boolean).join('\n');
    return emailMessage;
  };
  
  const formatSMSMessage = (appointment, business, message, shortLink) => {
    if (!appointment || !business) return 'Appt data missing.';
    const timeZone = business.time_zone.split('/')[1].replace('_', ' ');
    const smsMessage = `Appt with ${business.business_name}: ${appointment.service_type} on ${appointment.meeting_date} at ${appointment.meeting_time} (${timeZone}). ${shortLink || ''}`;
    return smsMessage.length > 160 ? smsMessage.substring(0, 157) + '...' : smsMessage;
  };
  
  const generateICalendar = (appointment, business, message, notes) => {
    if (!appointment || !business) return null;
  
    const startDate = new Date(`${appointment.meeting_date}T${appointment.meeting_time}`);
    const endDate = new Date(startDate.getTime() + appointment.duration * 60 * 1000);
  
    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
  
    const description = [
      message,
      appointment.client_name ? `Client: ${appointment.client_name} (${appointment.client_email})` : '',
      business.phone ? `Contact: ${business.phone}` : '',
      notes.length > 0 ? '\nNotes:\n' + notes.join('\n') : '',
    ].filter(Boolean).join('\n');
  
    const location = `${business.business_name}, ${business.address}${business.unit ? ', ' + business.unit : ''}, ${business.city}, ${business.province} ${business.postal_code}`;
  
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${appointment.service_type} with ${business.business_name}`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      'STATUS:CONFIRMED',
      `ORGANIZER;CN=${business.business_name}:mailto:no-reply@delparte.com`,
      `ATTENDEE;CN=${appointment.client_name}:mailto:${appointment.client_email}`,
      `UID:${Date.now()}@delparte.com`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
  
    return icsContent;
  };
  
  export { formatEmailMessage, formatSMSMessage, generateICalendar };