import { defineStore } from 'pinia';
// Importa o objeto default do serviço
import {listarProdutos, buscarProdutoPorId} from '../services/produtos';

export const useProdutosStore = defineStore("produtos", {
  state: () => ({
    lista: [],
    produtoAtual: null,
    carregando: false,
    erro: null,
  }),

  actions: {
    async carregarProdutos(filtros = {}) {
      this.carregando = true;
      this.erro = null;
      try {
        // Chama o método listarProdutos do objeto importado
        const dados = await listarProdutos(filtros);
        
        // O DRF pode retornar paginação { count, results: [] } ou array direto []
        // Esta verificação garante que sempre salvamos o array na store
        this.lista = Array.isArray(dados) ? dados : (dados.results || []);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        this.erro = "Erro ao carregar produtos. Verifique sua conexão.";
      } finally {
        this.carregando = false;
      }
    },

    async carregarProdutoDetalhe(id) {
      this.carregando = true;
      this.erro = null;
      try {
        // Chama o método buscarProdutoPorId do objeto importado
        this.produtoAtual = await buscarProdutoPorId(id);
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err);
        this.erro = "Erro ao carregar detalhes do produto.";
      } finally {
        this.carregando = false;
      }
    }
  },
});