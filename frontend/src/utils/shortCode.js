import { customAlphabet } from 'nanoid';
import supabase from '../supabaseClient';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);

export const generateShortCode = async () => {
  let shortCode;
  let isUnique = false;
  const maxAttempts = 5;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    shortCode = nanoid();
    const { data, error } = await supabase
      .from('appointment_links')
      .select('short_code')
      .eq('short_code', shortCode)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error('Error checking short code uniqueness: ' + error.message);
    }
    if (!data) {
      isUnique = true;
      break;
    }
  }

  if (!isUnique) {
    throw new Error('Failed to generate a unique short code after multiple attempts.');
  }

  return shortCode;
};