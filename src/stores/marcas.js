import { defineStore } from 'pinia';
import MarcasService from '@/services/marcas';

export const useMarcasStore = defineStore("marcas", {
  state: () => ({
    marcas: [],
    carregando: false,
  }),
  actions: {
    async carregarMarcas() {
      this.carregando = true;
      try {
        const dados = await MarcasService.listarMarcas();
        this.marcas = dados.results ? dados.results : dados;
      } catch (err) {
        console.error("Erro ao carregar marcas", err);
      } finally {
        this.carregando = false;
      }
    },
  },
});