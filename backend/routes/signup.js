const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log('Signup attempt:', { email, password });
  try {
    console.log('Checking email in users_view:', email);
    const { data: existingUsers, error: fetchError } = await req.supabase
      .from('users_view')
      .select('id')
      .eq('email', email);

    if (fetchError) {
      console.error('Error checking existing email in users_view:', fetchError);
      throw new Error(`Failed to check email: ${fetchError.message}`);
    }
    console.log('Query result for email:', { email, existingUsers });
    if (existingUsers && existingUsers.length > 0) {
      console.log('User already exists in Supabase users_view:', email);
      return res.status(409).json({ error: 'User already exists. Please log in.' });
    }

    // Sign up the user with Supabase Auth
    const { data, error } = await req.supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Signup error details:', error);
      throw new Error(`Signup failed: ${error.message}`);
    }

    if (!data.user) {
      throw new Error('No user data returned');
    }

    console.log('Signup success, user data:', data.user);

    res.status(200).json({ 
      message: 'Signup successful! Please check your email to confirm your account.', 
      userId: data.user.id 
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;