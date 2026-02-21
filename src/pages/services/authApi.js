import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register User
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login User
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  
  if (response.data.token) {
    // Store token in localStorage
    localStorage.setItem('token', response.data.token);
    
    // Decode token to get role (simple decode, not verification)
    const tokenPayload = JSON.parse(atob(response.data.token.split('.')[1]));
    localStorage.setItem('role', tokenPayload.role || 'user');
    localStorage.setItem('userId', tokenPayload.id);
  }
  
  return response.data;
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
};

// Get Current User Token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Get Current User Role
export const getUserRole = () => {
  return localStorage.getItem('role');
};

// Check if User is Authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Get User ID
export const getUserId = () => {
  return localStorage.getItem('userId');
};

// Set Authorization Header for API Calls
export const setAuthHeader = () => {
  const token = getToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
