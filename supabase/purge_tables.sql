-- Clears all data from CalenBooker tables while keeping their structure intact.
-- Resets auto-incrementing IDs and cascades to related records; auth.users remains unaffected.
-- Use this in the Supabase SQL Editor to wipe data without altering schema (e.g., for testing).
TRUNCATE TABLE public.messages RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.appointments RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.business_profile RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.appointment_links RESTART IDENTITY CASCADE;