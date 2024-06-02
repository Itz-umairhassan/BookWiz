import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer';
import Layout from './containers/Layout';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import ForgotPassword from './pages/ForgotPassword';
import { SearchProvider } from './context/SearchContext';
import { Context } from './context/Context';

export default function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <AccessibleNavigationAnnouncer />
      <SearchProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Render Layout if authenticated */}
          {user ? (
            <Route path="/app/*" element={<Layout />} />
          ) : (
            <Route path="/app/*" element={<Navigate to="/login" replace />} />
          )}
          
          {/* Redirect from root to login if not authenticated */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </SearchProvider>
    </Router>
  );
}
