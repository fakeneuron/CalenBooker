-- Configures Row-Level Security (RLS) for CalenBooker tables to restrict data access.
ALTER TABLE business_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated inserts" ON appointments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated updates" ON appointments
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow authenticated select" ON appointments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow authenticated inserts" ON business_profile
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated updates" ON business_profile
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow authenticated select" ON business_profile
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow authenticated inserts" ON messages
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated updates" ON messages
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow authenticated select" ON messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow authenticated inserts on appointment_links" ON appointment_links
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated updates on appointment_links" ON appointment_links
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM appointments
      WHERE appointments.id = appointment_links.appointment_id
      AND appointments.user_id = auth.uid()
    )
  );
CREATE POLICY "Allow authenticated select all on appointment_links" ON appointment_links
  FOR SELECT USING (auth.role() = 'authenticated');