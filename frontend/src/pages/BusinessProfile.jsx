import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { 
  container, 
  button, 
  buttonSecondary, 
  errorText, 
  heading, 
  previewButton, 
  previewContainer, 
  previewText, 
  previewTitle,
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
    parkingInstructions: '',
    officeDirections: '',
    customInfo: '',
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
          .select('email, business_name, phone, address, unit, city, province, postal_code, time_zone, parking_instructions, office_directions, custom_info')
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
            parkingInstructions: data.parking_instructions || '',
            officeDirections: data.office_directions || '',
            customInfo: data.custom_info || '',
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
          parking_instructions: formData.parkingInstructions,
          office_directions: formData.officeDirections,
          custom_info: formData.customInfo,
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
      email: 'info@janesbarbershop.com',
      businessName: 'Jane’s Barber Shop',
      phone: '416-555-1234',
      address: '123 Main St',
      unit: 'Unit 5',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5V 2T6',
      timeZone: 'America/Toronto',
      parkingInstructions: 'Park in the lot behind the building.',
      officeDirections: 'Enter through the main door, take the stairs to the second floor.',
      customInfo: 'Bring cash for tips!',
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
        <FormField
          type="textarea"
          name="parkingInstructions"
          value={formData.parkingInstructions}
          onChange={handleChange}
          labelText="Parking Instructions"
        />
        <FormField
          type="textarea"
          name="officeDirections"
          value={formData.officeDirections}
          onChange={handleChange}
          labelText="Office Directions"
        />
        <FormField
          type="textarea"
          name="customInfo"
          value={formData.customInfo}
          onChange={handleChange}
          labelText="Custom Info"
        />
        {error && <p className={errorText}>{error}</p>}
        <div className={buttonGroup}>
          <button type="submit" className={`${button} w-full`}>
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
          {formData.parkingInstructions && <p className={previewText}><strong>Parking:</strong> {formData.parkingInstructions}</p>}
          {formData.officeDirections && <p className={previewText}><strong>Directions:</strong> {formData.officeDirections}</p>}
          {formData.customInfo && <p className={previewText}><strong>Info:</strong> {formData.customInfo}</p>}
        </div>
      )}
    </div>
  );
};

export default BusinessProfile;