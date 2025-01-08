import axios from 'axios';
import { store } from '../store/store'; // Import the store instance
import { logout, loading } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.VITE_BASE_URL
    : 'https://tablenow.dk/tablenow-backend/api';

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    // Dispatch loading state using the store instance
    store.dispatch(loading(true));

    return config;
  },
  (error) => {
    store.dispatch(loading(false));
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    store.dispatch(loading(false));
    return response;
  },
  (error) => {
    store.dispatch(loading(false));

    if (error.response && error.response.status === 401) {
      store.dispatch(logout());

      // Navigate to login from the component, not the interceptor
      // Example: Use navigate('/login') directly in your component or via a custom hook
    }

    return Promise.reject(error);
  }
);

export default API;
