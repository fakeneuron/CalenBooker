require('dotenv').config({ path: './.env' }); // Changed from '../.env'
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = 4001;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
// console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4000' }));
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

app.get('/', (req, res) => {
  res.send('Hello from CalenBooker backend!');
});

app.get('/test-supabase', async (req, res) => {
  try {
    const { data, error } = await req.supabase.from('signup').select('*').limit(1);
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/business-details/check', async (req, res) => {
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

app.get('/test-auth-users', async (req, res) => {
  console.log('Testing auth.users query with anon key');
  try {
    const { data, error } = await req.supabase
      .from('auth.users')
      .select('id, email')
      .limit(1);  
    if (error) throw error;
    console.log('Test query result:', { data, error });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Test query error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

app.use('/signup', require('./routes/signup'));
app.use('/business-details', require('./routes/business-details'));
app.use('/schedule-meeting', require('./routes/schedule-meeting'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});