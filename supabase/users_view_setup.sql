-- Drop existing users_view to ensure a clean slate
DROP VIEW IF EXISTS public.users_view;

-- Create view with SECURITY INVOKER (default, not DEFINER)
CREATE VIEW public.users_view AS
SELECT id, email FROM auth.users;

-- Restrict permissions: revoke anon, grant authenticated
REVOKE ALL ON public.users_view FROM anon;
GRANT SELECT ON public.users_view TO authenticated;

-- Create secure function for email existence check
CREATE OR REPLACE FUNCTION public.check_email_exists(email_to_check TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM auth.users WHERE email = email_to_check);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Grant anon permission to call the function
GRANT EXECUTE ON FUNCTION public.check_email_exists(TEXT) TO anon;