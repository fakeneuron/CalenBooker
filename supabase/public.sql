-- Public-facing RLS policies for CalenBooker MVP public link (/a/<short_code>).
CREATE POLICY "Public read non-expired links" ON appointment_links
  FOR SELECT TO anon
  USING (expires_at > now());

CREATE POLICY "Public read minimal appt data" ON appointments
  FOR SELECT TO anon
  USING (id IN (SELECT appointment_id FROM appointment_links WHERE expires_at > now()));

CREATE POLICY "Public read business basics" ON business_profile
  FOR SELECT TO anon
  USING (user_id IN (SELECT user_id FROM appointments WHERE id IN (SELECT appointment_id FROM appointment_links WHERE expires_at > now())));