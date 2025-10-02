import api from "./api";

export async function getProduto(id) {
  const response = await api.get(`produtos/${id}/`);
  return response.data;
}
export async function getAllProducts() {
  const response = await api.get(`produtos/`);
  return response.data;
}