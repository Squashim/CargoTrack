import axios from 'axios';

if (!import.meta.env.VITE_API_URL) {
  throw new Error('env: VITE_API_URL is not defined');
}

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export { API };
