require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = 4001;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4000' }));
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

app.get('/', (req, res) => {
  res.send('Hello from CalenBooker backend!');
});

// Optional test endpoint (you can keep or remove this later)
app.get('/test-supabase', async (req, res) => {
  try {
    const { data, error } = await req.supabase.from('signup').select('*').limit(1);
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});