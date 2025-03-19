-- Reset entire database (drops all custom objects)
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS business_profile CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
-- Removed DROP VIEW public.users_view (no longer exists)
DROP FUNCTION IF EXISTS public.insert_default_messages(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.check_email_exists(TEXT) CASCADE;
DROP FUNCTION IF EXISTS public.execute_sql(TEXT) CASCADE;