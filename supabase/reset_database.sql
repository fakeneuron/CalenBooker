-- Fully resets the CalenBooker database by dropping all custom tables and functions.
-- Use with caution: this removes all user-created data and schema, but preserves auth.users.
-- Run this in the Supabase SQL Editor to start fresh (e.g., during testing or major updates).
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS business_profile CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
-- Removed DROP VIEW public.users_view (no longer exists, per A.11 completion)
DROP FUNCTION IF EXISTS public.insert_default_messages(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.check_email_exists(TEXT) CASCADE;
DROP FUNCTION IF EXISTS public.execute_sql(TEXT) CASCADE;