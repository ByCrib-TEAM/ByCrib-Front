import { defineStore } from 'pinia';
import { listarCategorias } from '@/services/categorias';

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
        this.categorias = await listarCategorias();
      } catch (err) {
        this.erro = "Erro ao carregar categorias";
        console.error(err);
      } finally {
        this.carregando = false;
      }
    },
  },
});
