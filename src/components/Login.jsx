import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null); // State to hold success or error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      const response = await axios.post('http://localhost:5000/login', userData);
      console.log(response.data); // Log the response for debugging
      setMessage('Login successful');
      onLogin(); // Update parent state to set isAuthenticated
      navigate('/home', { replace: true }); // Redirect to home page after successful login
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Invalid username or password'); // Set error message
      } else {
        setMessage('Login failed. Please try again later.'); // Generic error message
      }
      console.error('Login Error:', error); // Log the error for debugging
    }
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      {message && <p style={{ color: message.includes('successful') ? 'blue' : 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="login-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
