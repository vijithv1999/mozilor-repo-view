import axios from "axios";
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/user'
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // You can modify the request config here if needed
    return config;
  },
  error => {
    // Handle request errors
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // You can process the response data here
    return response;
  },
  error => {
    // Handle response errors
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance

