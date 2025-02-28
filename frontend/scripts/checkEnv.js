const dotenv = require('dotenv');

// Load environment variables from the root .env file
dotenv.config({ path: '../../.env' });

console.log('REACT_APP_SUPABASE_URL:', process.env.REACT_APP_SUPABASE_URL);
console.log('REACT_APP_SUPABASE_ANON_KEY:', process.env.REACT_APP_SUPABASE_ANON_KEY);
