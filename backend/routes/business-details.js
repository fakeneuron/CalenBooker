const express = require('express');
const { saveFormData } = require('../utils/formHandler');
const router = express.Router();

router.post('/', async (req, res) => {
  const { businessName, phone, userId } = req.body;
  console.log('Business details submission:', { businessName, phone, userId });
  try {
    // Fetch existing Supabase entry
    const { data: existing, error: fetchError } = await req.supabase
      .from('business_details')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

    // Merge with new data
    const updatedData = {
      user_id: userId,
      business_name: businessName !== undefined ? businessName : existing?.business_name,
      phone: phone !== undefined ? phone : existing?.phone,
    };

    // Upsert in Supabase
    const { data, error } = await req.supabase
      .from('business_details')
      .upsert(updatedData, { onConflict: 'user_id' })
      .select();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    console.log('Supabase business details response:', data);

    // Upsert in SQLite
    const businessData = {
      id: data[0].id,
      user_id: userId,
      business_name: data[0].business_name,
      phone: data[0].phone,
    };
    await req.db.run(
      'INSERT OR REPLACE INTO business_details (id, user_id, business_name, phone) VALUES (?, ?, ?, ?)',
      [businessData.id, businessData.user_id, businessData.business_name, businessData.phone]
    );
    console.log('SQLite business details saved:', businessData);

    res.status(200).json({ 
      message: existing ? 'Business details updated successfully!' : 'Business details saved successfully!',
      isUpdate: !!existing
    });
  } catch (error) {
    console.error('Business details error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;