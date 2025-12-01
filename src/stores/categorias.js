import { defineStore } from 'pinia';
import CategoriaService from '@/services/categorias';

export const useCategoriasStore = defineStore("categorias", {
  state: () => ({
    categorias: [],
    carregando: false,
    erro: null,
  }),

  actions: {
    async carregarCategorias() {
      this.carregando = true;
      this.erro = null;
      try {
        const dados = await CategoriaService.listarCategorias();
        this.categorias = Array.isArray(dados) ? dados : dados.results;
      } catch (err) {
        console.error(err);
        this.erro = "Erro ao carregar categorias";
      } finally {
        this.carregando = false;
      }
    },
  },
});