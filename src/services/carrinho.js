import api from "./api";

export default {
  async buscarCarrinho() {
    const response = await api.get('carrinhos/');
    return response.data;
  },

  async adicionarItem(produtoId, quantidade) {
    const response = await api.post('carrinhos/adicionar/', {
      produto: produtoId,
      quantidade: quantidade
    });
    return response.data;
  },

  async removerItem(produtoId) {
    const response = await api.post('carrinhos/remover/', {
      produto: produtoId
    });
    return response.data;
  },

  async finalizarCarrinho() {
    const response = await api.post('carrinhos/finalizar/');
    return response.data;
  }
};