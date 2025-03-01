-- Create the users_view and grant anon key access
-- Creates a view to expose id and email from auth.users for signup email checks
CREATE VIEW public.users_view AS
SELECT id, email FROM auth.users;

-- Grants SELECT permission to the anon role for unauthenticated access
GRANT SELECT ON public.users_view TO anon;