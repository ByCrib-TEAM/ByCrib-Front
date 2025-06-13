<script setup>
import { defineProps, defineEmits, ref } from 'vue'
const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])
const produtosOpen = ref(false)
function close() {
  emit('close')
}
</script>

<template>
  <transition name="slide">
    <aside
      v-if="open"
      class="fixed top-0 left-0 h-full w-80 bg-black z-40 flex flex-col justify-between"
      @click.self="close"
    >
      <div>
        <!-- Botão para fechar -->
        <button
          class="text-white text-2xl mt-6 ml-6"
          @click="close"
          aria-label="Fechar menu"
        >
          &times;
        </button>
        <nav class="mt-8">
          <ul class="flex flex-col gap-6 pl-8">
            <li>
              <a href="#" class="text-white text-xl font-light">Início</a>
            </li>
            <li>
              <button
                class="flex items-center text-white text-xl font-light focus:outline-none"
                @click="produtosOpen = !produtosOpen"
              >
                Produtos
                <svg
                  :class="{'rotate-180': produtosOpen}"
                  class="ml-2 transition-transform"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              <ul v-if="produtosOpen" class="ml-6 mt-2 flex flex-col gap-2">
                <li>
                  <a href="#" class="text-gray-300 text-base">Camisetas</a>
                </li>
                <li>
                  <a href="#" class="text-gray-300 text-base">Calças</a>
                </li>
                                <li>
                  <a href="#" class="text-gray-300 text-base">Casacos</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" class="text-white text-xl font-light">News Letter</a>
            </li>
            <li>
              <a href="#" class="text-white text-xl font-light">Contato</a>
            </li>
            <li>
              <a href="#" class="text-white text-xl font-light">Trocas e devoluções</a>
            </li>
            <li>
              <a href="#" class="text-white text-xl font-light">Sobre Nós</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="border-t border-gray-700 px-6 py-6 flex items-center gap-3">
        <span class="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center">
          <svg fill="white" width="20" height="20" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 16-4 16 0" />
          </svg>
        </span>
        <span class="text-white text-lg font-light">Cadastro/Login</span>
      </div>
    </aside>
  </transition>
  <!-- overlay escuro -->
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 bg-black opacity-50 z-30"
      @click="close"
    ></div>
  </transition>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.rotate-180 {
  transform: rotate(180deg);
}
</style>