-- Enable RLS for Tables
ALTER TABLE business_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to INSERT meetings
CREATE POLICY "Allow authenticated inserts" ON meetings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to UPDATE their own meetings
CREATE POLICY "Allow authenticated updates" ON meetings
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow authenticated users to SELECT their own meetings
CREATE POLICY "Allow authenticated select" ON meetings
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