// Axios Instance for API calls
import axios from 'axios';

// Create a new Axios instance
// The baseURL is set to the API base URL from the environment variables
// The timeout is set to 5000 milliseconds
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000, // Set your preferred timeout
});

// Add a request interceptor to attach the Keycloak token as an authorization header
// This function is called before each request is made
// If there's an error during this phase, the request is rejected
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// This function sets the Authorization header for the axios instance
// If a token is provided, it sets the Authorization header to `Bearer ${token}`
// If no token is provided, it removes the Authorization header
export const setAuthToken = (token: string) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export default axiosInstance;
