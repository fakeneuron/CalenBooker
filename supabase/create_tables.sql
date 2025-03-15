-- Create Tables
-- Supabase (PostgreSQL) schema for CalenBooker MVP (simplified to use auth.users)
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

-- Function to insert default messages
CREATE OR REPLACE FUNCTION public.insert_default_messages()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO messages (user_id, event_type, default_message)
  VALUES
    (NEW.id, 'scheduled', 'Thank you for booking with us! Your appointment is confirmed.'),
    (NEW.id, 'rescheduled', 'Looking forward to your new appointment time!'),
    (NEW.id, 'cancelled', 'Sorry we won’t see you this time.'),
    (NEW.id, 'no_show', 'We missed you last time!');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for new users (create only if it doesn’t exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'trigger_insert_default_messages'
    AND tgrelid = 'auth.users'::regclass
  ) THEN
    CREATE TRIGGER trigger_insert_default_messages
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.insert_default_messages();
  END IF;
END;
$$;