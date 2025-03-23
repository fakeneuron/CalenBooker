import { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { generateShortCode } from '../utils/shortCode';

const useAppointmentDetails = (id, code, isPublic = false) => {
  const [appt, setAppt] = useState(null);
  const [business, setBusiness] = useState(null);
  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState([]);
  const [shortLink, setShortLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        let apptId = id;

        if (isPublic && code) {
          const { data: linkData, error: linkError } = await supabase
            .from('appointment_links')
            .select('appointment_id')
            .eq('short_code', code)
            .limit(1)
            .maybeSingle();
          if (linkError) throw new Error(`Public link fetch failed: ${linkError.message}`);
          if (!linkData) throw new Error('Invalid or expired link.');
          apptId = linkData.appointment_id;

          const { data: apptData, error: apptError } = await supabase
            .from('appointments')
            .select('meeting_date, meeting_time, duration, service_type, user_id')
            .eq('id', apptId)
            .single();
          if (apptError) throw new Error(`Appointment fetch failed: ${apptError.message}`);

          const { data: bizData, error: bizError } = await supabase
            .from('business_profile')
            .select('business_name, address, unit, city, province, postal_code, parking_instructions, office_directions, custom_info')
            .eq('user_id', apptData.user_id)
            .single();
          if (bizError) throw new Error(`Business fetch failed: ${bizError.message}`);

          setAppt(apptData);
          setBusiness(bizData);
          setMessage('Your appointment is confirmed!');
          const notesArray = [];
          if (bizData?.parking_instructions) notesArray.push(`Parking: ${bizData.parking_instructions}`);
          if (bizData?.office_directions) notesArray.push(`Directions: ${bizData.office_directions}`);
          if (bizData?.custom_info) notesArray.push(`Info: ${bizData.custom_info}`);
          setNotes(notesArray);
        } else if (apptId) {
          const { data: apptData, error: apptError } = await supabase
            .from('appointments')
            .select('client_name, client_email, meeting_date, meeting_time, duration, service_type, user_id')
            .eq('id', apptId)
            .single();
          if (apptError) throw new Error(`Appointment fetch failed: ${apptError.message}`);
          if (!apptData) throw new Error('Appointment not found.');

          const { data: businessData, error: businessError } = await supabase
            .from('business_profile')
            .select('business_name, address, unit, city, province, postal_code, phone, time_zone, parking_instructions, office_directions, custom_info')
            .eq('user_id', apptData.user_id)
            .single();
          if (businessError) throw new Error(`Business fetch failed: ${businessError.message}`);

          const { data: messageData, error: messageError } = await supabase
            .from('messages')
            .select('default_message')
            .eq('user_id', apptData.user_id)
            .eq('event_type', 'scheduled')
            .limit(1)
            .single();
          if (messageError) throw new Error(`Message fetch failed: ${messageError.message}`);

          setAppt(apptData);
          setBusiness(businessData);
          setMessage(messageData.default_message);

          const notesArray = [];
          if (businessData?.parking_instructions) notesArray.push(`Parking: ${businessData.parking_instructions}`);
          if (businessData?.office_directions) notesArray.push(`Directions: ${businessData.office_directions}`);
          if (businessData?.custom_info) notesArray.push(`Info: ${businessData.custom_info}`);
          setNotes(notesArray);

          const baseUrl = window.location.host;
          let existingLink;
          const { data, error } = await supabase
            .from('appointment_links')
            .select('short_code')
            .eq('appointment_id', apptId);
          if (error) {
            // Log only if debugging needed; 406 is handled gracefully
            // console.error('Short link fetch error details:', JSON.stringify(error, null, 2));
            existingLink = null;
          } else {
            existingLink = data && data.length > 0 ? data[0] : null;
          }

          if (existingLink && existingLink.short_code) {
            setShortLink(`${baseUrl}/a/${existingLink.short_code}`);
          } else {
            const shortCode = await generateShortCode();
            const expiresAt = new Date(apptData.meeting_date);
            expiresAt.setDate(expiresAt.getDate() + 1);
            const newLink = `${baseUrl}/a/${shortCode}`;

            try {
              const { error: insertError } = await supabase
                .from('appointment_links')
                .insert({
                  short_code: shortCode,
                  appointment_id: apptId,
                  expires_at: expiresAt.toISOString(),
                });
              if (insertError) throw insertError;
            } catch (insertError) {
              console.warn(`Failed to insert short link: ${insertError.message}`);
            }

            setShortLink(newLink); // Set link regardless of insert success
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

  return { appt, business, message, notes, shortLink, loading, error };
};

export default useAppointmentDetails;