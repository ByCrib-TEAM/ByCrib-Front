import api from "./api";

export default {
  async listarCompras() {
    const response = await api.get('compras/');
    return response.data;
  },

  async criarCompra() {
    const response = await api.post('compras/', {}); 
    return response.data;
  },

  async finalizarCompra(compraId) {
    const response = await api.post(`compras/${compraId}/finalizar/`);
    return response.data;
  }
};