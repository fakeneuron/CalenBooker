import React, { useEffect } from 'react';
import supabase from '../supabaseClient';
import ApptTable from '../components/ApptTable';
import { wideContainer, heading } from '../styles';

const Dashboard = () => {
  useEffect(() => {
    const initializeMessages = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) return;

      const userId = session.session.user.id;
      const { data: messages, error } = await supabase
        .from('messages')
        .select('id')
        .eq('user_id', userId)
        .limit(1);
      if (error) {
        return;
      }
      if (!messages?.length) {
        const { error: rpcError } = await supabase.rpc('insert_default_messages', { user_id_input: userId });
        if (rpcError) {
        }
      }
    };
    initializeMessages();
  }, []);

  return (
    <div className={wideContainer}>
      <h2 className={heading}>CalenBooker Dashboard</h2>
      <ApptTable />
    </div>
  );
};

export default Dashboard;