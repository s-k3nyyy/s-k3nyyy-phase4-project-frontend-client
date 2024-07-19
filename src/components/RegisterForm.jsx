import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './RegisterForm.css';
import axios from 'axios';

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      username,
      email,
      password,
      phone_number: phoneNumber, // match the backend attribute name
    };

    try {
      const response = await axios.post('https://phase4-project-backend-server.onrender.com/register', userData); // adjust the endpoint
      console.log(response.data);
      onRegister(); // optional: trigger a callback function after successful registration
      navigate('/login', { replace: true }); // navigate to login page after registration
    } catch (error) {
      alert('Registration failed. Please try again.');
      console.error('Registration Error:', error);
    }
  };

  return (
    <div className="form-container">
      <p className="title">Create account</p>
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="input" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input 
          type="email" 
          className="input" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="tel" 
          className="input" 
          placeholder="Phone Number" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <div className="password-container">
          <input 
            type={passwordVisible ? 'text' : 'password'} 
            className="input" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FontAwesomeIcon 
            icon={passwordVisible ? faEyeSlash : faEye} 
            onClick={() => setPasswordVisible(!passwordVisible)} 
            className="password-icon"
          />
        </div>
        <div className="password-container">
          <input 
            type={confirmPasswordVisible ? 'text' : 'password'} 
            className="input" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <FontAwesomeIcon 
            icon={confirmPasswordVisible ? faEyeSlash : faEye} 
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} 
            className="password-icon"
          />
        </div>
        <button type="submit" className="form-btn">Create account</button>
      </form>
      <p className="sign-up-label">
        Already have an account? <Link to="/login" className="sign-up-link">Log in</Link>
      </p>
      <div className="buttons-container">
        <div className="apple-login-button">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" className="apple-icon" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
          </svg>
          <span>Sign up with Apple</span>
        </div>
        <div className="google-login-button">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" x="0px" y="0px" className="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
              c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
              c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
              C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
              c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
              c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.03,40.728,32.909,43.611,20.083z"></path>
          </svg>
          <span>Sign up with Google</span>
        </div>
        <div className="facebook-login-button">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" className="facebook-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M279.14 288l14.22-92.66h-88.91V141.1c0-25.35 12.42-50.06 52.24-50.06H293V6.26S266.44 0 241.76 0C182.54 0 143 37.95 143 135.56v59.78H56v92.66h87v224.31a327.82 327.82 0 00100 0V288z"></path>
          </svg>
          <span>Sign up with Facebook</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
