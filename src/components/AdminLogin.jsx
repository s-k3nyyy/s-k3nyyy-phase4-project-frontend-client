import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/admin/login', {
        username: username,
        password: password,
      });

      console.log('Response:', response); // Log response to check server response structure

      if (response.status === 200) {
        const { access_token } = response.data;
        localStorage.setItem('admin_token', access_token);
        console.log('Logged in successfully'); // Log success message
        navigate('/admin/dashboard'); // Redirect to admin dashboard upon successful login
      } else {
        setError('Invalid username or password'); // Handle login error
      }
    } catch (error) {
      console.error('Error logging in:', error); // Log detailed error message
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;
