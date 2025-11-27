import api from "./api";

export default {
  async listarCategorias() {
    const response = await api.get('categorias/');
    return response.data;
  }
};