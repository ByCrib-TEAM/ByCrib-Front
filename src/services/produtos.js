import api from "./api";

export async function getProduto(id) {
  const response = await api.get(`produtos/${id}/`);
  return response.data;
}

export async function getAllProducts() {
  const response = await api.get(`produtos/`);
  return response.data;
}

export async function searchProdutos(query) {
  try {
    const response = await api.get(`produtos/search/`, {
      params: {
        q: query
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro na busca de produtos:', error);
    return [];
  }
}