import axios from "axios";

const API_BASE = axios.create({
  baseURL: "https://bycrib-back-x7zl.onrender.com/api/",
  // baseURL: "http://127.0.0.1:19003/api",
});

export default API_BASE;


export async function buscarProdutoPorId(id) {
  const response = await API_BASE.get(`/produtos/${id}/`);
  return response.data;
}
