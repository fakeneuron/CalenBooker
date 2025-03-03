import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import supabase from './supabaseClient';
import Home from './pages/Home';
import Signup from './pages/Signup';
import SignupSuccess from './pages/SignupSuccess';
import Login from './pages/Login';
import AuthConfirm from './pages/AuthConfirm';
import Dashboard from './pages/Dashboard';
import BusinessProfile from './pages/BusinessProfile';
import AppointmentScheduler from './pages/AppointmentScheduler';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Add this import

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="App min-h-screen flex flex-col">
      {session && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={!session ? <Home /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!session ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route path="/signup-success" element={!session ? <SignupSuccess /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!session ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/business-profile" element={session ? <BusinessProfile /> : <Navigate to="/login" />} />
          <Route path="/appointment-scheduler" element={session ? <AppointmentScheduler /> : <Navigate to="/login" />} />
          <Route path="/auth/confirm" element={<AuthConfirm />} />
          <Route path="/appointment-confirmation/:id" element={<AppointmentConfirmation />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;