require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 4001;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const dbPath = path.join(__dirname, 'data', 'calenbooker.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('SQLite connection error:', err.message);
  else console.log('Connected to SQLite database');
});

async function initializeSQLite() {
  try {
    const schema = await fs.readFile(path.join(__dirname, 'db', 'schema.sql'), 'utf8');
    console.log('Schema file read successfully');
    await new Promise((resolve, reject) => {
      db.exec(schema, (err) => {
        if (err) reject(new Error(`SQLite schema error: ${err.message}`));
        else resolve();
      });
    });
    console.log('SQLite schema loaded');
  } catch (err) {
    console.error('SQLite initialization error:', err.message);
    throw err;
  }
}

initializeSQLite()
  .then(() => {
    app.use(express.json());
    app.use(cors({ origin: 'http://localhost:4000' }));
    app.use((req, res, next) => {
      req.supabase = supabase;
      req.db = db;
      next();
    });

    app.get('/', (req, res) => {
      res.send('Hello from CalenBooker backend!');
    });

    app.get('/business-details/check', async (req, res) => {
      const { userId } = req.query;
      try {
        const { data, error } = await req.supabase
          .from('business_details')
          .select('*')
          .eq('user_id', userId)
          .single();
        if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
        res.status(200).json(data ? { exists: true, ...data } : { exists: false });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    app.use('/signup', require('./routes/signup'));
    app.use('/business-details', require('./routes/business-details'));
    app.use('/schedule-meeting', require('./routes/schedule-meeting'));

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to:', err.message);
    process.exit(1);
  });