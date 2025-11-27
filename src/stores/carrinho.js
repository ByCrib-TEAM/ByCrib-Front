import { defineStore } from 'pinia';
import CarrinhoService from '@/services/carrinho';

export const useCarrinhoStore = defineStore("carrinho", {
  state: () => ({
    carrinho: null,
    aberto: false,
    carregando: false,
    erro: null,
  }),

  getters: {
    itensFormatados: (state) => {
      if (!state.carrinho || !state.carrinho.itens) return [];
      
      return state.carrinho.itens.map(item => {
        const prod = item.produto;
        
        let imagem = '/src/images/Shopaholic.png';
        if (prod.imagens && prod.imagens.length > 0) {
          imagem = prod.imagens[0].url;
        } 
        else if (prod.imagem_url) {
          imagem = prod.imagem_url;
        }
        else if (prod.imagem) {
             imagem = typeof prod.imagem === 'string' ? prod.imagem : prod.imagem.url;
        }

        return {
          id: item.id,
          produto_id: prod.id,
          name: prod.nome,
          price: parseFloat(prod.preco),
          quantity: item.quantidade,
          image: imagem
        };
      });
    },

    subtotal: (state) => {
      return state.carrinho?.total ? parseFloat(state.carrinho.total) : 0;
    },

    quantidadeTotal: (state) => {
      if (!state.carrinho || !state.carrinho.itens) return 0;
      return state.carrinho.itens.reduce((acc, item) => acc + item.quantidade, 0);
    }
  },

  actions: {
    toggleCarrinho() {
      this.aberto = !this.aberto;
      if (this.aberto) this.buscarCarrinho();
    },

    async buscarCarrinho() {
      this.carregando = true;
      this.erro = null;
      try {
        this.carrinho = await CarrinhoService.buscarCarrinho();
      } catch (err) {
        if (err.response && (err.response.status === 404 || err.response.status === 401)) {
          this.carrinho = null;
        } else {
          console.error("Erro ao buscar carrinho:", err);
          this.erro = "Erro ao carregar carrinho.";
        }
      } finally {
        this.carregando = false;
      }
    },

    async atualizarQuantidade(item, novaQuantidade) {
      const diferenca = novaQuantidade - item.quantity;
      
      if (diferenca === 0) return;

      this.carregando = true;
      try {
        await CarrinhoService.adicionarItem(item.produto_id, diferenca);
        await this.buscarCarrinho();
      } catch (err) {
        console.error("Erro ao atualizar:", err);
        this.erro = "Erro ao atualizar quantidade.";
      } finally {
        this.carregando = false;
      }
    },

    async removerItem(produtoId) {
      this.carregando = true;
      try {
        await CarrinhoService.removerItem(produtoId);
        await this.buscarCarrinho();
      } catch (err) {
        console.error("Erro ao remover:", err);
        this.erro = "Erro ao remover item.";
      } finally {
        this.carregando = false;
      }
    },

    async finalizarCompra() {
      this.carregando = true;
      try {
        await CarrinhoService.finalizarCarrinho();
        alert("Compra finalizada com sucesso!");
        this.carrinho = null;
        this.aberto = false;
      } catch (err) {
        console.error("Erro no checkout:", err);
        alert("Erro ao finalizar compra. Tente novamente.");
      } finally {
        this.carregando = false;
      }
    }
  },
});