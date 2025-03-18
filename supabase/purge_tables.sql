-- Purge all data from CalenBooker tables without dropping them
-- Does not affect auth.users
TRUNCATE TABLE public.messages RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.appointments RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.business_profile RESTART IDENTITY CASCADE;