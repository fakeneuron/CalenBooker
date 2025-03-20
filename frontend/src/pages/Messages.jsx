import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { wideContainer, heading, button, input, label, buttonGroup } from '../styles';

const defaultMessages = {
  scheduled: 'Thank you for booking with us! Your appointment is confirmed.',
  rescheduled: 'Looking forward to your new appointment time!',
  cancelled: 'Sorry we won’t see you this time.',
  no_show: 'We missed you last time!'
};

const Messages = () => {
  const [messages, setMessages] = useState({});
  const [businessInfo, setBusinessInfo] = useState({});
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
    } else {
      const messagesMap = {};
      messagesData.forEach((msg) => {
        messagesMap[msg.event_type] = { id: msg.id, default_message: msg.default_message };
      });
      setMessages(messagesMap);
    }

    const { data: profileData, error: profileError } = await supabase
      .from('business_profile')
      .select('parking_instructions, office_directions, custom_info')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
    } else {
      setBusinessInfo(profileData || {});
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

    const { error } = await supabase
      .from('business_profile')
      .upsert({
        user_id: user.id,
        parking_instructions: businessInfo.parking_instructions,
        office_directions: businessInfo.office_directions,
        custom_info: businessInfo.custom_info
      }, { onConflict: 'user_id' });

    if (error) {
      alert('Failed to save: ' + error.message);
    } else {
      alert('Business info saved successfully!');
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
    setBusinessInfo({ parking_instructions: '', office_directions: '', custom_info: '' });
  };

  if (loading) return <div className={wideContainer}>Loading...</div>;

  return (
    <div className={wideContainer}>
      <h1 className={heading}>Default Messages</h1>
      {Object.keys(defaultMessages).map((eventType) => (
        <div key={eventType} className="mb-6 p-4 bg-pink-100 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold capitalize mb-2 text-blue-600">
            {eventType === 'no_show' ? 'No-Show' : eventType}
          </h2>
          <div className="mb-4">
            <label className={label}>
              Default Message
            </label>
            <textarea
              className={input}
              value={messages[eventType]?.default_message || defaultMessages[eventType]}
              onChange={(e) => handleMessageChange(eventType, e.target.value)}
              rows="3"
            />
          </div>
          <div className={buttonGroup}>
            <button onClick={() => handleSaveMessage(eventType)} className={`${button} w-full`}>
              Save
            </button>
            <button
              onClick={() => handleRevertMessage(eventType)}
              className={`${button} w-full bg-gray-500 hover:bg-gray-600`}
            >
              Revert to Default
            </button>
          </div>
        </div>
      ))}
      <div className="mb-6 p-4 bg-pink-100 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-blue-600">Business Information</h2>
        {['parking_instructions', 'office_directions', 'custom_info'].map((field) => (
          <div key={field} className="mb-4">
            <label className={label}>
              {field.replace('_', ' ')}
            </label>
            <textarea
              className={input}
              value={businessInfo[field] || ''}
              onChange={(e) => handleBusinessInfoChange(field, e.target.value)}
              rows="3"
            />
          </div>
        ))}
        <div className={buttonGroup}>
          <button onClick={handleSaveBusinessInfo} className={`${button} w-full`}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;