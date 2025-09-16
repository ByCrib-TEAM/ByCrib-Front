import axios from "axios";

const API_BASE = "https://bycrib-back-x7zl.onrender.com/api";

export async function buscarProdutoPorId(id) {
  const response = await axios.get(`${API_BASE}/produtos/${id}/`);
  return response.data;
}
