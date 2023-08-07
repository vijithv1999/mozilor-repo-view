import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Dashboard from './View/Dashboard';
import SignupPage from './Pages/SignupPage';
import AuthProvider, { useAuth } from './Providers/AuthProvider';

const AppRouter = () => {
  const auth = useAuth();



  return (
    <Routes>
      <Route path="/" element={auth.isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/dashboard" element={auth.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />
      </Router>
    </AuthProvider>
  );
};

export default App;
