import axios from 'axios';
import { handleApiError } from './errorHandler';

const API_URL = 'http://localhost:5000/api/auth';

// Register a new user
export const registerUser = async (name, username, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      username,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    const handledError = handleApiError(error);
    console.error('Error registering user:', handledError.message);
    throw handledError;
  }
};

// Login a user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log('API login response:', response.data); // Log the response to debug
    return response.data; // Ensure this structure
  } catch (error) {
    const handledError = handleApiError(error);
    console.error('Error logging in user:', handledError.message);
    throw handledError;
  }
};

// Get current user (requires authentication)
export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const handledError = handleApiError(error);
    console.error('Error fetching current user:', handledError.message);
    throw handledError;
  }
};

// Admin: Create a new user
export const createUser = async (userData, token) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const handledError = handleApiError(error);
    console.error('Error creating user:', handledError.message);
    throw handledError;
  }
};

// Admin: Delete a user by ID
export const deleteUser = async (userId, token) => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    const handledError = handleApiError(error);
    console.error('Error deleting user:', handledError.message);
    throw handledError;
  }
};

// Admin: Get a user by ID
export const getUserById = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const handledError = handleApiError(error);
    console.error('Error fetching user:', handledError.message);
    throw handledError;
  }
};

// Admin: Get all users
export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const handledError = handleApiError(error);
    console.error('Error fetching users:', handledError.message);
    throw handledError;
  }
};

// Admin: Update a user by ID
export const updateUser = async (userId, userData, token) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const handledError = handleApiError(error);
    console.error('Error updating user:', handledError.message);
    throw handledError;
  }
};
