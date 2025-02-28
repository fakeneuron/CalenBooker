-- Supabase (PostgreSQL) schema for CalenBooker MVP (simplified to use auth.users)
DROP TABLE IF EXISTS meetings;
DROP TABLE IF EXISTS business_details;

CREATE TABLE business_details (
  user_id UUID PRIMARY KEY,  -- References auth.users.id
  email TEXT UNIQUE NOT NULL,
  business_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  unit TEXT,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  logo TEXT,
  FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TABLE meetings (
  id BIGSERIAL PRIMARY KEY,  -- Auto-incrementing ID for PostgreSQL
  user_id UUID NOT NULL,     -- One-to-many with auth.users
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  meeting_date DATE NOT NULL,
  meeting_time TIME NOT NULL,
  duration INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES auth.users(id)
);