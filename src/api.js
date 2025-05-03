import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000' // Endereço onde seu backend Node.js (Express) está rodando
});

export default api;
