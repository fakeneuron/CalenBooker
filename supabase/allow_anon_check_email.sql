CREATE POLICY "Allow anon to check emails" ON auth.users
  FOR SELECT
  USING (true);