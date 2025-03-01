// Calenbooker/frontend/src/pages/BusinessProfile.js
import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const BusinessProfile = () => {
  const [formData, setFormData] = useState({
    email: '',
    businessName: '',
    phone: '',
    address: '',
    unit: '',
    city: '',
    province: '',
    postalCode: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      try {
        const { data, error } = await supabase
          .from('business_profile')
          .select('email, business_name, phone, address, unit, city, province, postal_code')
          .eq('user_id', session.user.id)
          .single();
        if (error && error.code !== 'PGRST116') throw error; // Ignore "no rows" error
        if (data) {
          setFormData({
            email: data.email || '',
            businessName: data.business_name || '',
            phone: data.phone || '',
            address: data.address || '',
            unit: data.unit || '',
            city: data.city || '',
            province: data.province || '',
            postalCode: data.postal_code || ''
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
          postal_code: formData.postalCode
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
      postalCode: 'M5V 2T6'
    });
    setError('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Business Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Business Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Unit</label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Province</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
        <button
          type="button"
          onClick={handleAutoPopulate}
          className="w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-700 mt-2"
        >
          Fill Sample Data
        </button>
      </form>
    </div>
  );
};

export default BusinessProfile;