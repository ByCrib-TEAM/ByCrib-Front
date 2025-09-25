import axios from 'axios'

const api = axios.create({
  baseURL: 'https://bycrib-back-x7zl.onrender.com/api/',
})

export default api