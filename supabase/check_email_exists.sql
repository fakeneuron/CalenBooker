-- Checks if an email is already registered in auth.users for signup validation.
-- Replaces the less secure users_view with a SECURITY DEFINER function, ensuring safe anon access.
DROP FUNCTION IF EXISTS public.check_email_exists(TEXT);
CREATE OR REPLACE FUNCTION public.check_email_exists(email_to_check TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM auth.users WHERE email = email_to_check);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Grant anon permission to call function for signup checks
REVOKE ALL ON FUNCTION public.check_email_exists(TEXT) FROM public, anon, authenticated, service_role, postgres;
GRANT EXECUTE ON FUNCTION public.check_email_exists(TEXT) TO anon;