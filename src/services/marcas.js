import api from "./api";

export default {
  async listarMarcas() {
    const response = await api.get('marcas/');
    return response.data;
  }
};