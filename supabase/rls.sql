-- Configures Row-Level Security (RLS) for CalenBooker tables to restrict data access.
-- Authenticated users can manage their own records; public access handled in public.sql.
ALTER TABLE business_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_links ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to INSERT appointments
CREATE POLICY "Allow authenticated inserts" ON appointments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to UPDATE their own appointments
CREATE POLICY "Allow authenticated updates" ON appointments
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow authenticated users to SELECT their own appointments
CREATE POLICY "Allow authenticated select" ON appointments
  FOR SELECT USING (auth.uid() = user_id);

-- Allow authenticated users to INSERT business profile
CREATE POLICY "Allow authenticated inserts" ON business_profile
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to UPDATE their own business profile
CREATE POLICY "Allow authenticated updates" ON business_profile
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow authenticated users to SELECT their own business profile
CREATE POLICY "Allow authenticated select" ON business_profile
  FOR SELECT USING (auth.uid() = user_id);

-- Allow authenticated users to INSERT messages
CREATE POLICY "Allow authenticated inserts" ON messages
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to UPDATE their own messages
CREATE POLICY "Allow authenticated updates" ON messages
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow authenticated users to SELECT their own messages
CREATE POLICY "Allow authenticated select" ON messages
  FOR SELECT USING (auth.uid() = user_id);

-- RLS for appointment_links: Authenticated insert/update only
CREATE POLICY "Allow authenticated insert/update" ON appointment_links
  FOR ALL USING (auth.role() = 'authenticated');