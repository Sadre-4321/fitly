import axios from 'axios';
import { getToken } from './authApi';

const API_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get All Products (Public)
export const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

// Get Single Product (Public)
export const getSingleProduct = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

// Create Product (Admin Only - Requires Token)
export const createProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/products`, productData, {
    headers: getAuthHeaders()
  });
  return response.data;
};

// Update Product (Admin Only - Requires Token)
export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/products/${id}`, productData, {
    headers: getAuthHeaders()
  });
  return response.data;
};

// Delete Product (Admin Only - Requires Token)
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/products/${id}`, {
    headers: getAuthHeaders()
  });
  return response.data;
};
