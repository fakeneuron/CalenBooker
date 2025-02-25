const express = require('express');
const { saveFormData } = require('../utils/formHandler');
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log('Signup attempt:', { email, password });
  try {
    const { data, error } = await req.supabase.auth.signUp({ email, password });
    console.log('Supabase signup response:', { data, error });
    if (error) {
      if (error.message.includes('already registered')) {
        return res.status(409).json({ error: 'User already exists. Please log in.' });
      }
      throw new Error(`Signup failed: ${error.message}`);
    }
    if (!data.user) throw new Error('No user data returned');
    if (!data.session) {
      // Duplicate signup returns user data but no session
      return res.status(409).json({ error: 'User already exists. Please log in.' });
    }

    console.log('Signup success, user data:', data.user);
    const signupData = {
      id: data.user.id,
      user_id: data.user.id,
      email: email,
    };
    await saveFormData(req.db, 'signup', signupData);
    console.log('SQLite signup data saved:', signupData);
    res.status(200).json({ message: 'Signup successful! Check your email to confirm.', userId: data.user.id });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;