import axios from 'axios';
import { getToken } from './authApi';

const API_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create Order (User - Requires Token)
export const createOrder = async (orderData) => {
  const response = await axios.post(`${API_URL}/orders`, orderData, {
    headers: getAuthHeaders()
  });
  return response.data;
};

// Get My Orders (User - Requires Token)
export const getMyOrders = async () => {
  const response = await axios.get(`${API_URL}/orders/my-orders`, {
    headers: getAuthHeaders()
  });
  return response.data;
};

// Get Order By ID (User/Admin/Delivery - Requires Token)
export const getOrderById = async (id) => {
  const response = await axios.get(`${API_URL}/orders/${id}`, {
    headers: getAuthHeaders()
  });
  return response.data;
};

// Get All Orders (Admin/Delivery - Requires Token)
export const getAllOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`, {
    headers: getAuthHeaders()
  });
  return response.data;
};

// Update Order Status (Admin/Delivery - Requires Token)
export const updateOrderStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/orders/${id}/status`, { status }, {
    headers: getAuthHeaders()
  });
  return response.data;
};
