import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import supabase from './supabaseClient';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BusinessDetailsForm from './pages/BusinessDetailsForm';
import ScheduleMeetingForm from './pages/ScheduleMeetingForm';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function Home() {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">CalenBooker</h1>
        <p className="text-lg text-gray-700">Coming Soon</p>
        <div className="mt-4">
          <a href="/signup" className="text-blue-900 hover:underline mr-4">Sign Up</a>
          <a href="/login" className="text-blue-900 hover:underline">Log In</a>
        </div>
      </div>
    </div>
  );
}

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
          <Route index element={<BusinessDetailsForm />} />
        </Route>
        <Route path="/schedule-meeting" element={<ProtectedLayout />}>
          <Route index element={<ScheduleMeetingForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;