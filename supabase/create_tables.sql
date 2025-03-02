-- Create Tables
-- Supabase (PostgreSQL) schema for CalenBooker MVP (simplified to use auth.users)
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS business_profile;

CREATE TABLE business_profile (
  user_id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  business_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  unit TEXT,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  logo TEXT,
  time_zone TEXT NOT NULL DEFAULT 'America/New_York',
  FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TABLE appointments (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  meeting_date DATE NOT NULL,
  meeting_time TIME NOT NULL,
  duration INTEGER NOT NULL,
  service_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Confirmed',
  FOREIGN KEY (user_id) REFERENCES auth.users(id)
);