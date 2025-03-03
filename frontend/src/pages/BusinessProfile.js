import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { 
  container, 
  buttonPrimary, 
  buttonSecondary, 
  errorText, 
  heading, 
  previewButton, 
  previewContainer, 
  previewText, 
  previewTitle 
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
  const [showPreview, setShowPreview] = useState(false);

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
            email: data.email || '',
            businessName: data.business_name || '',
            phone: data.phone || '',
            address: data.address || '',
            unit: data.unit || '',
            city: data.city || '',
            province: data.province || '',
            postalCode: data.postal_code || '',
            timeZone: data.time_zone || 'America/New_York',
          });
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

    try {
      const { error } = await supabase
        .from('business_profile')
        .upsert({
          user_id: session.user.id,
          email: formData.email,
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
    } catch (error) {
      setError('Error saving business profile: ' + error.message);
    }
  };

  const handleAutoPopulate = () => {
    setFormData({
      email: 'info@janesbarbershop.com',
      businessName: 'Jane’s Barber Shop',
      phone: '416-555-1234',
      address: '123 Main St',
      unit: 'Unit 5',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5V 2T6',
      timeZone: 'America/Toronto',
    });
    setError('');
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
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
          required
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
        <div className="flex space-x-4">
          <button type="submit" className={buttonPrimary}>
            Save Profile
          </button>
          <button type="button" onClick={handleAutoPopulate} className={buttonSecondary}>
            Fill Sample Data
          </button>
          <button type="button" onClick={handlePreview} className={previewButton}>
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>
      </form>

      {showPreview && (
        <div className={previewContainer}>
          <h3 className={previewTitle}>Business Profile Preview</h3>
          <p className={previewText}><strong>Business Name:</strong> {formData.businessName || 'Business TBD'}</p>
          <p className={previewText}><strong>Email:</strong> {formData.email || 'Not provided'}</p>
          <p className={previewText}><strong>Phone:</strong> {formData.phone || 'Not provided'}</p>
          <p className={previewText}><strong>Location:</strong> {formData.address ? `${formData.address}${formData.unit ? ', ' + formData.unit : ''}, ${formData.city}, ${formData.province} ${formData.postalCode}` : 'Not provided'}</p>
          <p className={previewText}><strong>Time Zone:</strong> {formData.timeZone.split('/')[1].replace('_', ' ') || 'TBD'}</p>
        </div>
      )}
    </div>
  );
};

export default BusinessProfile;