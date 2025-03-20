const dotenv = require('dotenv');

// Load environment variables from frontend/.env
dotenv.config({ path: '../.env' }); // Adjusted path since script is in frontend/scripts/

console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY);