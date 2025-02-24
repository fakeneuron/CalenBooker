import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './forms/SignupForm';
import ConfirmationPage from './components/ConfirmationPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/confirm" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;