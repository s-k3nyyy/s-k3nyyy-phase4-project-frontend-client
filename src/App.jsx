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

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleUserLogin = () => {
    setIsUserAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setIsUserAuthenticated(false);
    localStorage.removeItem('access_token'); 
    localStorage.removeItem('admin_token'); 
  };

  // Function to handle admin logout
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('admin_token'); 
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
    }
  }, []);

  return (
    <Router basename="/s-k3nyyy-phase4-project-frontend-client/">
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Navigate to={isUserAuthenticated ? '/home' : '/login'} />} />
            <Route path="/login" element={<Login onLogin={handleUserLogin} />} />
            <Route path="/register" element={<RegisterForm onRegister={handleUserLogin} />} />

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
