import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import ExploreEvents from './components/ExploreEvents';
import Bookmark from './components/Bookmark';
import Reviews from './components/Reviews';
import './App.css';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  // Function to handle admin login
  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  // Function to handle user login
  const handleUserLogin = () => {
    setIsUserAuthenticated(true);
  };

  // Function to handle logout for both user and admin
  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setIsUserAuthenticated(false);
    localStorage.removeItem('access_token'); // Remove user access token
    localStorage.removeItem('admin_token'); // Remove admin token
  };

  // Function to handle admin logout
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('admin_token'); // Remove admin token from localStorage
  };

  // useEffect to check if user is logged in and refresh token if necessary
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      refreshToken(); // Call refreshToken function if access token is present
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Navigate to={isUserAuthenticated ? '/home' : '/login'} />} />
            <Route path="/login" element={<Login onLogin={handleUserLogin} />} />
            <Route path="/register" element={<RegisterForm onRegister={handleUserLogin} />} />

            {/* Conditionally render Home or redirect to /login */}
            {isUserAuthenticated ? (
              <>
                <Route path="/home" element={<Home onLogout={handleLogout} />} />
                <Route path="/explore" element={<ExploreEvents />} />
                <Route path="/bookmark" element={<Bookmark />} />
                <Route path="/reviews" element={<Reviews />} />
              </>
            ) : (
              <>
                <Route path="/home" element={<Navigate to="/login" />} />
                <Route path="/explore" element={<Navigate to="/login" />} />
                <Route path="/bookmark" element={<Navigate to="/login" />} />
                <Route path="/reviews" element={<Navigate to="/login" />} />
              </>
            )}

            {/* Route for Admin Dashboard */}
            {isAdminAuthenticated ? (
              <Route path="/admin/dashboard" element={<AdminDashboard onLogout={handleAdminLogout} />} />
            ) : (
              <Route path="/admin/dashboard" element={<Navigate to="/admin/login" />} />
            )}

            {/* Route for Admin Login */}
            <Route path="/admin/login" element={<AdminLogin onLogin={handleAdminLogin} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
