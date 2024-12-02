import axios from 'axios'

// Create Axios instance
const api = axios.create({
    // baseURL: 'http://localhost:5000/api',
    baseURL: 'https://ims-backend-jsj5.onrender.com/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include authorization token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Or use cookies or a global store
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized! Redirecting to login.');
            // Handle logout or redirection
        }
        return Promise.reject(error);
    }
);

export default api
