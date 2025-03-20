import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import supabase from './supabaseClient';
import Home from './pages/Home.jsx';
import AuthConfirm from './pages/AuthConfirm.jsx';
import Dashboard from './pages/Dashboard.jsx';
import BusinessProfile from './pages/BusinessProfile.jsx';
import AppointmentScheduler from './pages/AppointmentScheduler.jsx';
import AppointmentConfirmation from './pages/AppointmentConfirmation.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import Support from './pages/Support.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import Messages from './pages/Messages.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

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
    <div className="bg-pink-200 min-h-screen flex flex-col pt-16">
      {session && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={!session ? <Home /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/business-profile" element={session ? <BusinessProfile /> : <Navigate to="/" />} />
          <Route path="/appointment-scheduler" element={session ? <AppointmentScheduler /> : <Navigate to="/" />} />
          <Route path="/messages" element={session ? <Messages /> : <Navigate to="/" />} />
          <Route path="/auth/confirm" element={<AuthConfirm />} />
          <Route path="/appointment-confirmation/:id" element={<AppointmentConfirmation />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;