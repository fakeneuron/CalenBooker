import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import supabase from './supabaseClient';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BusinessProfile from './pages/BusinessProfile'; // Updated import
import ScheduleMeetingForm from './pages/ScheduleMeetingForm';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

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

  const ProtectedLayout = () => {
    if (!session) {
      return <Navigate to="/login" replace />;
    }
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={session ? <Navigate to="/dashboard" replace /> : <Home />} />
        <Route path="/dashboard" element={<ProtectedLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/business-details" element={<ProtectedLayout />}>
          <Route index element={<BusinessProfile />} /> {/* Updated component */}
        </Route>
        <Route path="/schedule-meeting" element={<ProtectedLayout />}>
          <Route index element={<ScheduleMeetingForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;