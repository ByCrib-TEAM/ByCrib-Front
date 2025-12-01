import { defineStore } from 'pinia';
import ComprasService from '@/services/compras';

export const useComprasStore = defineStore("compras", {
  state: () => ({
    lista: [], // Histórico de compras
    compraAtual: null, // Detalhes da compra sendo visualizada
    carregando: false,
    erro: null,
  }),

  actions: {
    // Carrega o histórico de compras do usuário
    async carregarMinhasCompras() {
      this.carregando = true;
      this.erro = null;
      try {
        const dados = await ComprasService.listarMinhasCompras();
        this.lista = Array.isArray(dados) ? dados : dados.results;
      } catch (err) {
        console.error("Erro ao carregar compras:", err);
        this.erro = "Não foi possível carregar seu histórico de compras.";
      } finally {
        this.carregando = false;
      }
    },

    // Inicia o processo de checkout (Cria a compra baseada no carrinho)
    async iniciarCheckout() {
      this.carregando = true;
      this.erro = null;
      try {
        // 1. Cria a compra (Pending)
        const novaCompra = await ComprasService.criarCompra();
        this.compraAtual = novaCompra;
        
        // 2. Finaliza a compra (Confirmed)
        await ComprasService.finalizarCompra(novaCompra.id);
        
        // Atualiza a lista local
        this.lista.unshift(novaCompra);
        
        return novaCompra; // Retorna para o componente exibir sucesso
      } catch (err) {
        console.error("Erro no checkout:", err);
        this.erro = "Erro ao processar a compra. Verifique o estoque.";
        throw err; // Lança erro para o componente tratar
      } finally {
        this.carregando = false;
      }
    }
  },
});