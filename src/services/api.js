import axios from "axios";

const API_BASE = axios.create({
  // baseURL: "https://bycrib-back-x7zl.onrender.com/api/",
  baseURL: "http://191.52.57.4:19003/api",
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

// Interceptor de resposta - faz refresh automático quando token expira
API_BASE.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(
          "http://191.52.57.4:19003/api/token/refresh/",
          { refresh: refreshToken }
        );

        const newAccessToken = response.data.access;
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API_BASE(originalRequest);
      } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/LoginPage';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API_BASE;

export async function buscarProdutoPorId(id) {
  const response = await API_BASE.get(`/produtos/${id}/`);
  return response.data;
}
