const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, business_name, phone, address, unit, city, province, postal_code, logo } = req.body;
  console.log('Business details submission:', { userId, business_name });
  try {
    // Debug: Check authentication context
    console.log('Current auth.uid():', req.supabase.auth.session?.user?.id || 'Not authenticated');
    console.log('Received userId from request:', userId);

    // Validate that the userId exists in users_view (optional, for security)
    const { data: users, error: userError } = await req.supabase
      .from('users_view')
      .select('id')
      .eq('id', userId);
    if (userError) {
      console.error('Error validating user in users_view:', userError);
      throw new Error(`Invalid user ID: ${userError.message}`);
    }
    if (!users || users.length === 0) {
      throw new Error('User not found in users_view');
    }
    const user = users[0]; // Use the first (and only) row, as id is unique

    // Insert or update business details, linking to auth.users.id
    const { data, error } = await req.supabase
      .from('business_details')
      .upsert({
        user_id: userId,
        business_name,
        phone,
        address,
        unit,
        city,
        province,
        postal_code,
        logo
      }, { onConflict: 'user_id' });
    if (error) {
      console.error('Error saving business details:', error);
      throw new Error(`Failed to save business details: ${error.message}`);
    }
    res.status(200).json({ message: 'Business details saved successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Optional: GET route to check or retrieve business details
router.get('/check', async (req, res) => {
  const { userId } = req.query;
  try {
    const { data, error } = await req.supabase
      .from('business_details')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    res.status(200).json(data ? { exists: true, ...data } : { exists: false });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;