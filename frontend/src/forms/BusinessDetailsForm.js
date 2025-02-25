import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const BusinessDetailsForm = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user_id');
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    userId: userId || '',
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4001/business-details/check?userId=${userId}`);
        if (data.exists) {
          setFormData({
            businessName: data.business_name || '',
            phone: data.phone || '',
            userId: userId,
          });
          setIsUpdate(true);
        }
      } catch (error) {
        console.log('No existing entry found or error:', error.message);
      }
    };
    if (userId) fetchExisting();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/business-details', formData);
      alert(response.data.message);
      setIsUpdate(response.data.isUpdate || true); // Set to true after first save
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
            required={!isUpdate} // Required only for first save
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