require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = 4001;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4000' }));

app.get('/', (req, res) => {
  res.send('Hello from CalenBooker backend!');
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log('Signup attempt:', { email, password });
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    res.status(200).json({ message: 'Signup successful! Check your email to confirm.' });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});