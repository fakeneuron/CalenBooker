-- Reset CalenBooker database by dropping all tables, views, functions, and triggers
-- Save this for future resets

-- Drop tables with CASCADE to remove dependencies
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS business_profile CASCADE;

-- Drop views
DROP VIEW IF EXISTS public.users_view CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS public.insert_default_messages() CASCADE;
DROP FUNCTION IF EXISTS public.insert_default_messages(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.check_email_exists(TEXT) CASCADE;

-- Drop triggers
DROP TRIGGER IF EXISTS trigger_insert_default_messages ON auth.users CASCADE;