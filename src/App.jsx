import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/home" 
              element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/" />} 
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
