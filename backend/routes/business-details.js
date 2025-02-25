const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, businessName, phone, address, unit, city, province, postalCode, logo } = req.body;
  console.log('Business details submission:', { email, businessName, phone, address, unit, city, province, postalCode, logo });
  try {
    const { data: existing, error: fetchError } = await req.supabase
      .from('business_details')
      .select('*')
      .eq('email', email)
      .single();
    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

    const updatedData = {
      email,
      business_name: businessName !== undefined ? businessName : existing?.business_name,
      phone: phone !== undefined ? phone : existing?.phone,
      address: address !== undefined ? address : existing?.address,
      unit: unit !== undefined ? unit : existing?.unit,
      city: city !== undefined ? city : existing?.city,
      province: province !== undefined ? province : existing?.province,
      postal_code: postalCode !== undefined ? postalCode : existing?.postal_code,
      logo: logo !== undefined ? logo : existing?.logo,
    };

    const { data, error } = await req.supabase
      .from('business_details')
      .upsert(updatedData, { onConflict: 'email' })
      .select();
    if (error) throw new Error(`Supabase error: ${error.message}`);
    console.log('Supabase business details response:', data);

    const businessData = {
      email: data[0].email,
      business_name: data[0].business_name,
      phone: data[0].phone,
      address: data[0].address,
      unit: data[0].unit,
      city: data[0].city,
      province: data[0].province,
      postal_code: data[0].postal_code,
      logo: data[0].logo,
    };
    await req.db.run(
      'INSERT OR REPLACE INTO business_details (email, business_name, phone, address, unit, city, province, postal_code, logo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [businessData.email, businessData.business_name, businessData.phone, businessData.address, businessData.unit, businessData.city, businessData.province, businessData.postal_code, businessData.logo]
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