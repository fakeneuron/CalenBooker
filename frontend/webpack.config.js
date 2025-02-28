const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables from the root .env file
dotenv.config({ path: '../../.env' });

module.exports = {
  resolve: {
    fallback: {
      // No polyfills needed since dotenv is not used in the frontend code
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_SUPABASE_URL': JSON.stringify(process.env.REACT_APP_SUPABASE_URL),
      'process.env.REACT_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.REACT_APP_SUPABASE_ANON_KEY),
    }),
  ],
};
