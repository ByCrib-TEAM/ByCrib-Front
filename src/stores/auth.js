import { defineStore } from 'pinia';
import AuthService from '@/services/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    loading: false,
    error: null,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const data = await AuthService.login(credentials);
        
        this.token = data.access;
        this.refreshToken = data.refresh;
        
        localStorage.setItem('accessToken', this.token);
        localStorage.setItem('refreshToken', this.refreshToken);
        
        if (credentials.email) {
            this.user = { email: credentials.email };
            localStorage.setItem('user', JSON.stringify(this.user));
        }

        return true;
      } catch (err) {
        console.error("Login Error:", err);
        
        if (err.response && err.response.data) {
            this.error = err.response.data.detail || 
                         err.response.data.non_field_errors?.[0] || 
                         'Credenciais inválidas.';
        } else if (err.request) {
            this.error = 'Erro de conexão com o servidor.';
        } else {
            this.error = 'Erro desconhecido ao tentar fazer login.';
        }
        
        return false;
      } finally {
        this.loading = false;
      }
    },

    async register(userData) {
      this.loading = true;
      this.error = null;
      try {
        await AuthService.register(userData);
        return true;
      } catch (err) {
        console.error("Register Error:", err);
        
        if (err.response && err.response.data) {
            const firstKey = Object.keys(err.response.data)[0];
            const firstError = err.response.data[firstKey];
            
            if (Array.isArray(firstError)) {
                this.error = `${firstKey}: ${firstError[0]}`;
            } else {
                this.error = typeof firstError === 'string' ? firstError : 'Erro na validação dos dados.';
            }
        } else {
            this.error = 'Erro de conexão ao tentar registrar.';
        }
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }
});