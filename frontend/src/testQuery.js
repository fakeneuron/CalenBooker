import supabase from './supabaseClient';

const testQuery = async () => {
  const { data: userData } = await supabase.auth.getUser();
  console.log('Current user ID:', userData.user?.id);

  const { data, error } = await supabase
    .from('appointment_links')
    .select('short_code')
    .eq('appointment_id', 17);
  console.log('Query result:', { data, error });
};

testQuery();