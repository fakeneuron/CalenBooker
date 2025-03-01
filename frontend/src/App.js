import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import supabase from './supabaseClient';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BusinessProfile from './pages/BusinessProfile';
import ScheduleMeeting from './pages/ScheduleMeeting';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import AuthConfirm from './pages/AuthConfirm';
import SignupSuccess from './pages/SignupSuccess'; // New import

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
        <Route path="/signup-success" element={<SignupSuccess />} /> {/* New route */}
        <Route path="/login" element={<Login />} />
        <Route path="/business-profile" element={<ProtectedLayout />}>
          <Route index element={<BusinessProfile />} />
        </Route>
        <Route path="/schedule-meeting" element={<ProtectedLayout />}>
          <Route index element={<ScheduleMeeting />} />
        </Route>
        <Route path="/auth/confirm" element={<AuthConfirm />} />
      </Routes>
    </div>
  );
}

export default App;