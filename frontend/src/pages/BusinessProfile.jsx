import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { 
  container, 
  button, 
  buttonSecondary, 
  errorText, 
  heading,
  buttonGroup
} from '../styles';
import FormField from '../components/FormField';

const BusinessProfile = () => {
  const [formData, setFormData] = useState({
    email: '',
    businessName: '',
    phone: '',
    address: '',
    unit: '',
    city: '',
    province: '',
    postalCode: '',
    timeZone: 'America/New_York',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      try {
        const { data, error } = await supabase
          .from('business_profile')
          .select('email, business_name, phone, address, unit, city, province, postal_code, time_zone')
          .eq('user_id', session.user.id)
          .single();
        if (error && error.code !== 'PGRST116') throw error;
        if (data) {
          setFormData({
            email: data.email || session.user.email || '',
            businessName: data.business_name || '',
            phone: data.phone || '',
            address: data.address || '',
            unit: data.unit || '',
            city: data.city || '',
            province: data.province || '',
            postalCode: data.postal_code || '',
            timeZone: data.time_zone || 'America/New_York',
          });
        } else {
          setFormData(prev => ({ ...prev, email: session.user.email || '' }));
        }
      } catch (err) {
        setError('Error loading business profile: ' + err.message);
      }
    };

    fetchBusinessProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      setError('Please log in to save your business profile.');
      return;
    }

    if (!formData.businessName || !formData.phone || !formData.address || !formData.city || !formData.province || !formData.postalCode || !formData.timeZone) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const { error } = await supabase
        .from('business_profile')
        .upsert({
          user_id: session.user.id,
          email: formData.email || session.user.email,
          business_name: formData.businessName,
          phone: formData.phone,
          address: formData.address,
          unit: formData.unit,
          city: formData.city,
          province: formData.province,
          postal_code: formData.postalCode,
          time_zone: formData.timeZone,
        });
      if (error) throw error;
      alert('Business profile saved successfully!');
      setError('');
    } catch (error) {
      setError('Error saving business profile: ' + error.message);
    }
  };

  const handleAutoPopulate = () => {
    setFormData({
      email: 'info@fknenterprises.com',
      businessName: 'FKN Enterprises',
      phone: '416-555-5678',
      address: '456 Elm St',
      unit: 'Unit 66',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5V 3K9',
      timeZone: 'America/Toronto',
    });
    setError('');
  };

  const timeZoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'America/Toronto', label: 'Eastern Time (Toronto)' },
  ];

  return (
    <div className={container}>
      <h2 className={heading}>Business Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          labelText="Business Email"
        />
        <FormField
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          labelText="Business Name"
          required
        />
        <FormField
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          labelText="Phone"
          required
        />
        <FormField
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          labelText="Address"
          required
        />
        <FormField
          type="text"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          labelText="Unit"
        />
        <FormField
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          labelText="City"
          required
        />
        <FormField
          type="text"
          name="province"
          value={formData.province}
          onChange={handleChange}
          labelText="Province"
          required
        />
        <FormField
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          labelText="Postal Code"
          required
        />
        <FormField
          name="timeZone"
          value={formData.timeZone}
          onChange={handleChange}
          labelText="Time Zone"
          required
          options={timeZoneOptions}
        />
        {error && <p className={errorText}>{error}</p>}
        <div className={buttonGroup}>
          <button type="submit" className={`${button} w-full`}>
            Save Profile
          </button>
          <button type="button" onClick={handleAutoPopulate} className={buttonSecondary}>
            Fill Sample Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessProfile;