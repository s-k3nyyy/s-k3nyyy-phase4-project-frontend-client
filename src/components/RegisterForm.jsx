import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RegisterForm({ returnToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }

      // Add input validation here
      if (!username || !email || !password) {
        setMessage('Please fill in all fields');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/register', { username, email, password });
      setMessage(response.data.message);
      if (response.status === 200) {
        // Delay navigation by 2 seconds
        setTimeout(() => {
          navigate('/home', { replace: true }); // Navigate to /home
          returnToLogin(); // Call the parent function to return to login form
        }, 2000); // 2000 milliseconds = 2 seconds
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred');
      }
    }
  };

  const handleReturnToLogin = () => {
    returnToLogin(); // Ensure returnToLogin is invoked correctly
  };

  return (
    <div className="register-form-container">
      <h2>Register</h2>
      <InputField
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
      <div className="return-to-login">
        <button onClick={handleReturnToLogin}>Return to Login</button>
      </div>
    </div>
  );
}

const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default RegisterForm;
