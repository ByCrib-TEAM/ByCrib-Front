import api from "./api";

export async function getProduto(id) {
  const response = await api.get(`produtos/${id}/`);
  return response.data;
}
