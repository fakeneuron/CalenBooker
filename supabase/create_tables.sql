-- Sets up the core database schema for CalenBooker, including tables for business profiles, appointments, and messages.
-- Includes utility functions to populate default messages and execute SQL securely.
-- Tables reference auth.users for user-specific data; run this first to establish the structure.
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS business_profile;
DROP TABLE IF EXISTS messages;

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
  parking_instructions TEXT,
  office_directions TEXT,
  custom_info TEXT,
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

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('scheduled', 'rescheduled', 'cancelled', 'no_show')),
  default_message TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES auth.users(id),
  UNIQUE (user_id, event_type)
);

-- Insert default messages for new users (called from Dashboard.js)
CREATE OR REPLACE FUNCTION public.insert_default_messages(user_id_input UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO messages (user_id, event_type, default_message)
  VALUES
    (user_id_input, 'scheduled', 'Thank you for booking with us! Your appointment is confirmed.'),
    (user_id_input, 'rescheduled', 'Looking forward to your new appointment time!'),
    (user_id_input, 'cancelled', 'Sorry we won’t see you this time.'),
    (user_id_input, 'no_show', 'We missed you last time!')
  ON CONFLICT (user_id, event_type) DO NOTHING;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Execute arbitrary SQL with fixed search_path for security
DROP FUNCTION IF EXISTS public.execute_sql(TEXT);
CREATE OR REPLACE FUNCTION public.execute_sql(sql_text TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE sql_text;
END;
$$ LANGUAGE plpgsql SET search_path = public;