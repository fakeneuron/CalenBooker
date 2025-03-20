-- Configures Row-Level Security (RLS) for CalenBooker tables to restrict data access.
-- Authenticated users can manage their own records; messages are publicly readable for confirmations.
ALTER TABLE business_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

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

-- Allow public SELECT on messages for confirmation
CREATE POLICY "Allow public select for confirmation" ON messages
  FOR SELECT
  USING (true);

-- RLS for appointment_links: Allow public read, authenticated insert/update
ALTER TABLE appointment_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon read access" ON appointment_links
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert/update" ON appointment_links
  FOR ALL USING (auth.role() = 'authenticated');