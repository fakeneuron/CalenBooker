--Enable RLS for Tables
ALTER TABLE business_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;


-- Allow authenticated users to INSERT meetings (linked to auth.users.id)
CREATE POLICY "Allow authenticated inserts" ON meetings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to UPDATE their own meetings (using auth.users.id)
CREATE POLICY "Allow authenticated updates" ON meetings
  FOR UPDATE USING (auth.uid() = user_id);



 -- Allow authenticated users to INSERT business details (linked to auth.users.id)
CREATE POLICY "Allow authenticated inserts" ON business_details
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to UPDATE their own business details (using auth.users.id)
CREATE POLICY "Allow authenticated updates" ON business_details
  FOR UPDATE USING (auth.uid() = user_id); 

-- Allow authenticated users to SELECT their own business details
CREATE POLICY "Allow authenticated select" ON business_details
  FOR SELECT USING (auth.uid() = user_id);
  