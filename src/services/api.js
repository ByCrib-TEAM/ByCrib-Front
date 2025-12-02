import axios from "axios";

const API_BASE = axios.create({
  // baseURL: "https://bycrib-back-x7zl.onrender.com/api/",
  baseURL: "http://191.52.59.67:19003/api",
});

// Interceptor de requisição - adiciona token em todas as requisições
API_BASE.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
