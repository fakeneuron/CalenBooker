import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { wideContainer, heading, iconButtonSubtle, input, label, buttonGroup } from '../styles';
import { FaSave, FaUndo, FaTrash } from 'react-icons/fa';

const defaultMessages = {
  scheduled: 'Thank you for booking with us! Your appointment is confirmed.',
  rescheduled: 'Looking forward to your new appointment time!',
  cancelled: 'Sorry we won’t see you this time.',
  no_show: 'We missed you last time!'
};

const Messages = () => {
  const [messages, setMessages] = useState({});
  const [businessInfo, setBusinessInfo] = useState({
    parking_instructions: '',
    office_directions: '',
    custom_info: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: messagesData, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', user.id);

    if (messagesError) {
      console.error('Error fetching messages:', messagesError);
    } else {
      const messagesMap = {};
      messagesData.forEach((msg) => {
        messagesMap[msg.event_type] = { id: msg.id, default_message: msg.default_message };
      });
      setMessages(messagesMap);
    }

    const { data: profileData, error: profileError } = await supabase
      .from('business_profile')
      .select('business_name, phone, address, unit, city, province, postal_code, time_zone, parking_instructions, office_directions, custom_info')
      .eq('user_id', user.id)
      .limit(1);

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching business profile:', profileError);
    } else {
      setBusinessInfo({
        parking_instructions: profileData?.[0]?.parking_instructions || '',
        office_directions: profileData?.[0]?.office_directions || '',
        custom_info: profileData?.[0]?.custom_info || '',
      });
    }

    setLoading(false);
  };

  const handleMessageChange = (eventType, value) => {
    setMessages((prev) => ({
      ...prev,
      [eventType]: { ...prev[eventType], default_message: value }
    }));
  };

  const handleBusinessInfoChange = (field, value) => {
    setBusinessInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveMessage = async (eventType) => {
    const message = messages[eventType];
    const { error } = await supabase
      .from('messages')
      .update({ default_message: message.default_message })
      .eq('id', message.id);

    if (error) {
      alert('Failed to save: ' + error.message);
    } else {
      alert('Message saved successfully!');
    }
  };

  const handleSaveBusinessInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: existingProfile, error: fetchError } = await supabase
      .from('business_profile')
      .select('business_name, phone, address, unit, city, province, postal_code, time_zone')
      .eq('user_id', user.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      alert('Error fetching existing profile: ' + fetchError.message);
      return;
    }

    if (!existingProfile || !existingProfile.business_name) {
      alert('Please save your business profile with required fields in the Business Profile section first.');
      return;
    }

    const updatedProfile = {
      user_id: user.id,
      business_name: existingProfile.business_name,
      phone: existingProfile.phone,
      address: existingProfile.address,
      unit: existingProfile.unit || null,
      city: existingProfile.city,
      province: existingProfile.province,
      postal_code: existingProfile.postal_code,
      time_zone: existingProfile.time_zone,
      parking_instructions: businessInfo.parking_instructions,
      office_directions: businessInfo.office_directions,
      custom_info: businessInfo.custom_info
    };

    const { error } = await supabase
      .from('business_profile')
      .upsert(updatedProfile, { onConflict: 'user_id' });

    if (error) {
      alert('Failed to save: ' + error.message);
    } else {
      alert('Business info saved successfully!');
      setBusinessInfo({
        parking_instructions: updatedProfile.parking_instructions,
        office_directions: updatedProfile.office_directions,
        custom_info: updatedProfile.custom_info
      });
    }
  };

  const handleRevertMessage = (eventType) => {
    if (window.confirm(`Are you sure you want to revert the "${eventType === 'no_show' ? 'No-Show' : eventType}" message to its default?`)) {
      setMessages((prev) => ({
        ...prev,
        [eventType]: { ...prev[eventType], default_message: defaultMessages[eventType] }
      }));
    }
  };

  const handleRevertBusinessInfo = () => {
    setBusinessInfo({
      parking_instructions: '',
      office_directions: '',
      custom_info: ''
    });
  };

  if (loading) return <div className={wideContainer}>Loading...</div>;

  return (
    <div className={wideContainer}>
      <h1 className={heading}>Default Messages</h1>
      {Object.keys(defaultMessages).map((eventType) => (
        <div key={eventType} className="mb-2 bg-gray-100 p-2 rounded-md">
          <h2 className="text-md font-medium text-gray-700 mb-1 capitalize">
            {eventType === 'no_show' ? 'No-Show' : eventType}
          </h2>
          <div className="relative">
            <textarea
              className={input}
              value={messages[eventType]?.default_message || defaultMessages[eventType]}
              onChange={(e) => handleMessageChange(eventType, e.target.value)}
              rows="2"
            />
            <div className={`${buttonGroup} absolute top-1 right-1`}>
              <button onClick={() => handleSaveMessage(eventType)} className={iconButtonSubtle} title="Save">
                <FaSave size={14} />
              </button>
              <button onClick={() => handleRevertMessage(eventType)} className={iconButtonSubtle} title="Revert to default">
                <FaUndo size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="mb-2 bg-gray-100 p-2 rounded-md">
        <h2 className="text-md font-medium text-gray-700 mb-1">Business Information</h2>
        {['parking_instructions', 'office_directions', 'custom_info'].map((field) => (
          <div key={field} className="mb-1">
            <label className={label}>
              {field.replace('_', ' ').replace('info', 'Info')}
            </label>
            <div className="relative">
              <textarea
                className={input}
                value={businessInfo[field] || ''}
                onChange={(e) => handleBusinessInfoChange(field, e.target.value)}
                rows="2"
              />
              <div className={`${buttonGroup} absolute top-1 right-1`}>
                <button onClick={handleSaveBusinessInfo} className={iconButtonSubtle} title="Save">
                  <FaSave size={14} />
                </button>
                <button onClick={handleRevertBusinessInfo} className={iconButtonSubtle} title="Clear">
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;