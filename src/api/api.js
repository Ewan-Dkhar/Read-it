import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 Unauthorized
api.interceptors.response.use(
  (response) => {
    // Optionally handle generic success wraps if we want to unwrap here, 
    // but usually it's better to return the full response or response.data.
    // For now we'll return response, meaning callers do res.data.data
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect immediately
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;
