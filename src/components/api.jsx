import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your Flask server URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data; // Assuming your backend returns data upon successful registration
  } catch (error) {
    throw error; // Handle error as needed
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    return response.data; // Assuming your backend returns data upon successful login
  } catch (error) {
    throw error; // Handle error as needed
  }
};
