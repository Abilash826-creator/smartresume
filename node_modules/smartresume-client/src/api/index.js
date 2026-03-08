import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle auth errors globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Resume
export const createResume = (data) => API.post('/resume/create', data);
export const getUserResumes = () => API.get('/resume/user');
export const getResumeById = (id) => API.get(`/resume/${id}`);
export const updateResume = (id, data) => API.put(`/resume/update/${id}`, data);
export const deleteResume = (id) => API.delete(`/resume/delete/${id}`);

// AI
export const improveText = (text, type) => API.post('/ai/improve-text', { text, type });

export default API;
