import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home'; // Import Home component
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard component
import AdminLogin from './components/AdminLogin'; // Import AdminLogin component
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
    localStorage.removeItem('admin_token'); // Clear admin JWT token from localStorage
    // Optionally clear user JWT token as well if needed
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('admin_token'); // Clear admin JWT token from localStorage
  };

  const handleRegister = () => {
    // Handle registration success or any other actions as needed
    setIsUserAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Navigate to={isUserAuthenticated ? '/home' : '/login'} />} />
            <Route path="/login" element={<Login onLogin={handleUserLogin} />} />
            <Route path="/register" element={<RegisterForm onRegister={handleRegister} />} />
            {/* Conditionally render Home or redirect to /login */}
            {isUserAuthenticated ? (
              <>
                <Route path="/home" element={<Home onLogout={handleLogout} />} />
                <Route path="/admin" element={<Navigate to="/admin/login" />} />
              </>
            ) : (
              <>
                <Route path="/home" element={<Navigate to="/login" />} />
                <Route path="/admin" element={<AdminLogin onLogin={handleAdminLogin} />} />
              </>
            )}
            {/* Route for Admin Dashboard */}
            <Route path="/admin/dashboard" element={<AdminDashboard onLogout={handleAdminLogout} />} />
            {/* Route for Admin Login */}
            <Route path="/admin/login" element={<AdminLogin onLogin={handleAdminLogin} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
