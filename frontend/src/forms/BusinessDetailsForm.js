import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const BusinessDetailsForm = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [formData, setFormData] = useState({
    email: email || '',
    businessName: '',
    phone: '',
    address: '',
    unit: '',
    city: '',
    province: '',
    postalCode: '',
    logo: null,
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState('');

  const canadianProvinces = [
    { value: 'AB', label: 'Alberta' },
    { value: 'BC', label: 'British Columbia' },
    { value: 'MB', label: 'Manitoba' },
    { value: 'NB', label: 'New Brunswick' },
    { value: 'NL', label: 'Newfoundland and Labrador' },
    { value: 'NS', label: 'Nova Scotia' },
    { value: 'NT', label: 'Northwest Territories' },
    { value: 'NU', label: 'Nunavut' },
    { value: 'ON', label: 'Ontario' },
    { value: 'PE', label: 'Prince Edward Island' },
    { value: 'QC', label: 'Quebec' },
    { value: 'SK', label: 'Saskatchewan' },
    { value: 'YT', label: 'Yukon' },
  ];

  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4001/business-details/check?email=${encodeURIComponent(email)}`);
        if (data.exists) {
          setFormData({
            email: email,
            businessName: data.business_name || '',
            phone: data.phone || '',
            address: data.address || '',
            unit: data.unit || '',
            city: data.city || '',
            province: data.province || '',
            postalCode: data.postal_code || '',
            logo: data.logo || null,
          });
          setIsUpdate(true);
        }
      } catch (error) {
        console.log('No existing entry found or error:', error.message);
      }
    };
    if (email) fetchExisting();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'postalCode') {
      let formattedValue = value.toUpperCase().replace(/\s/g, '');
      if (formattedValue.length > 3) {
        formattedValue = `${formattedValue.slice(0, 3)} ${formattedValue.slice(3)}`.trim();
      }
      const postalCodeRegex = /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/;
      setFormData({ ...formData, [name]: formattedValue });
      if (!postalCodeRegex.test(formattedValue) && formattedValue.length === 7) {
        setPostalCodeError('Postal code must be in format A1A 1A1');
      } else {
        setPostalCodeError('');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, logo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postalCodeError) {
      alert(postalCodeError);
      return;
    }
    try {
      const response = await axios.post('http://localhost:4001/business-details', formData);
      alert(response.data.message);
      setIsUpdate(response.data.isUpdate || true);
    } catch (error) {
      alert('Error saving details: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Business Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required={!isUpdate}
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
            required={!isUpdate}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Street Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required={!isUpdate}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Unit/Suite</label>
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
            required={!isUpdate}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Province</label>
          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required={!isUpdate}
          >
            <option value="">Select Province</option>
            {canadianProvinces.map((prov) => (
              <option key={prov.value} value={prov.value}>{prov.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${postalCodeError ? 'border-red-500' : ''}`}
            maxLength="7"
            required={!isUpdate}
          />
          {postalCodeError && <p className="text-sm text-red-500 mt-1">{postalCodeError}</p>}
        </div>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed p-4 text-center"
        >
          <p>Drag and drop logo here</p>
          {formData.logo && <img src={formData.logo} alt="Business Logo" className="mt-2 max-w-full h-auto" />}
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isUpdate ? 'Update Details' : 'Save Details'}
        </button>
      </form>
    </div>
  );
};

export default BusinessDetailsForm;