import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import RegisterForm from './components/RegisterForm';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleReturnToLogin = (navigate) => {
    navigate('/'); // Navigate to '/' route
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
            <Route path="/home" element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/register" element={<RegisterForm returnToLogin={handleReturnToLogin} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
