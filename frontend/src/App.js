import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Removed useNavigate
import supabase from './supabaseClient';
import Signup from './components/Signup';
import Login from './components/Login';
import BusinessDetailsForm from './forms/BusinessDetailsForm';
import ScheduleMeetingForm from './forms/ScheduleMeetingForm';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!session) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/business-details"
          element={
            <ProtectedRoute>
              <BusinessDetailsForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule-meeting"
          element={
            <ProtectedRoute>
              <ScheduleMeetingForm />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/signup" replace />} />
      </Routes>
    </div>
  );
}

export default App;