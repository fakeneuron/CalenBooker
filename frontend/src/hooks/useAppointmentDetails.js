import { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { generateShortCode } from '../utils/shortCode';

const useAppointmentDetails = (id, code, isPublic = false) => {
  const [appointment, setAppointment] = useState(null);
  const [business, setBusiness] = useState(null);
  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState([]);
  const [shortLink, setShortLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        let appointmentId = id;

        if (isPublic && code) {
          const { data: linkData, error: linkError } = await supabase
            .from('appointment_links')
            .select('appointment_id')
            .eq('short_code', code)
            .limit(1);
          if (linkError) throw linkError;
          if (!linkData || linkData.length === 0) throw new Error('Invalid or expired link.');
          appointmentId = linkData[0].appointment_id;

          const { data: apptData, error: apptError } = await supabase
            .from('appointments')
            .select('meeting_date, meeting_time, duration, user_id')
            .eq('id', appointmentId)
            .single();
          if (apptError) throw apptError;

          const { data: bizData, error: bizError } = await supabase
            .from('business_profile')
            .select('business_name, address, unit, city, province, postal_code')
            .eq('user_id', apptData.user_id)
            .single();
          if (bizError) throw bizError;

          setAppointment(apptData);
          setBusiness(bizData);
          setMessage('Your appointment is confirmed!');
        } else if (appointmentId) {
          const { data: appointmentData, error: appointmentError } = await supabase
            .from('appointments')
            .select('client_name, client_email, meeting_date, meeting_time, duration, service_type, user_id')
            .eq('id', appointmentId)
            .single();
          if (appointmentError) throw appointmentError;

          const { data: businessData, error: businessError } = await supabase
            .from('business_profile')
            .select('business_name, address, unit, city, province, postal_code, phone, time_zone, parking_instructions, office_directions, custom_info')
            .eq('user_id', appointmentData.user_id)
            .single();
          if (businessError) throw businessError;

          const { data: messageData, error: messageError } = await supabase
            .from('messages')
            .select('default_message')
            .eq('user_id', appointmentData.user_id)
            .eq('event_type', 'scheduled')
            .limit(1)
            .single();
          if (messageError) throw messageError;

          setAppointment(appointmentData);
          setBusiness(businessData);
          setMessage(messageData.default_message);

          const notesArray = [];
          if (businessData?.parking_instructions) notesArray.push(`Parking: ${businessData.parking_instructions}`);
          if (businessData?.office_directions) notesArray.push(`Directions: ${businessData.office_directions}`);
          if (businessData?.custom_info) notesArray.push(`Info: ${businessData.custom_info}`);
          setNotes(notesArray);

          const { data: existingLink, error: linkError } = await supabase
            .from('appointment_links')
            .select('short_code')
            .eq('appointment_id', appointmentId)
            .single();

          const baseUrl = window.location.host;
          if (existingLink) {
            setShortLink(`${baseUrl}/a/${existingLink.short_code}`);
          } else if (!linkError || linkError.code === 'PGRST116') {
            const shortCode = await generateShortCode();
            const expiresAt = new Date(appointmentData.meeting_date);
            expiresAt.setDate(expiresAt.getDate() + 1);

            const { error: insertError } = await supabase
              .from('appointment_links')
              .insert({
                short_code: shortCode,
                appointment_id: appointmentId,
                expires_at: expiresAt.toISOString(),
              });

            if (insertError) throw new Error('Failed to create short link: ' + insertError.message);
            setShortLink(`${baseUrl}/a/${shortCode}`);
          } else {
            throw new Error('Error checking short link: ' + linkError.message);
          }
        }
      } catch (err) {
        setError('Failed to load appointment details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id, code, isPublic]);

  return { appointment, business, message, notes, shortLink, loading, error };
};

export default useAppointmentDetails;