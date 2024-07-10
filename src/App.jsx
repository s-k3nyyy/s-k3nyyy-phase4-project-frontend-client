import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import ExploreEvents from './components/ExploreEvents';
import Bookmark from './components/Bookmark'; // Import Bookmark component
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
                <Route path="/explore" element={<ExploreEvents />} />
                <Route path="/bookmark" element={<Bookmark />} /> {/* Add Bookmark route */}
              </>
            ) : (
              <>
                <Route path="/home" element={<Navigate to="/login" />} />
                <Route path="/explore" element={<Navigate to="/login" />} />
                <Route path="/bookmark" element={<Navigate to="/login" />} /> {/* Redirect to login if not authenticated */}
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
