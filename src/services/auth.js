import api from "@/services/api";

class AuthService {
    async login(email, password) {
        try {
            const response = await api.post('token/', { email, password });
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(userData) {
        try {
            const response = await api.post('usuarios/', userData);
            return response.data;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    }

    async getUserProfile(token) {
        try {
            const response = await api.get('usuarios/me/');
            return response.data;
        } catch (error) {
            console.error('Get user profile error:', error);
            throw error;
        }
    }

    async refreshToken(refreshToken) {
        try {
            const response = await api.post('token/refresh/', { refresh: refreshToken });
            return response.data;
        } catch (error) {
            console.error('Refresh token error:', error);
            throw error;
        }
    }
}

export default new AuthService();