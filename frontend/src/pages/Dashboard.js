import React, { useEffect } from 'react';
import supabase from '../supabaseClient';
import AppointmentsTable from '../components/AppointmentsTable';
import { wideContainer, heading } from '../styles';

const Dashboard = () => {
  useEffect(() => {
    // Initialize default messages on first load if none exist
    const initializeMessages = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) return;

      const userId = session.session.user.id;
      // Check if user has messages
      const { data: messages, error } = await supabase
        .from('messages')
        .select('id')
        .eq('user_id', userId)
        .limit(1);
      if (error) {
        // Error handled silently
        return;
      }
      if (!messages?.length) {
        // Insert default messages via Supabase function
        const { error: rpcError } = await supabase.rpc('insert_default_messages', { user_id_input: userId });
        if (rpcError) {
          // Error handled silently
        }
      }
    };
    initializeMessages();
  }, []);

  return (
    <div className={wideContainer}>
      <h2 className={heading}>CalenBooker Dashboard</h2>
      <AppointmentsTable />
    </div>
  );
};

export default Dashboard;