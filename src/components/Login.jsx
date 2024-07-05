import React, { useState } from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm'; // Import the RegisterForm component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false); // State to toggle registration form
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      setMessage(response.data.message);
      if (response.status === 200) {
        onLogin(); // Update the authentication state
        navigate('/home'); // Navigate to the home page
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleShowRegisterForm = () => {
    setShowRegisterForm(true); // Set state to true to show register form
  };

  const handleReturnToLogin = () => {
    setShowRegisterForm(false); // Set state to false to hide register form
  };

  return (
    <div className="login-container">
      {!showRegisterForm && (
        <>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button-container">
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
          </div>
          <div className="register-link">
            <p>Don't have an account? <button onClick={handleShowRegisterForm}>Register</button></p>
          </div>
        </>
      )}
      {showRegisterForm && <RegisterForm returnToLogin={handleReturnToLogin} />} {/* Pass returnToLogin function */}
    </div>
  );
}

export default Login;
