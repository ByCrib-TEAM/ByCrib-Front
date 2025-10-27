<script setup>
import { ref, watch, nextTick, computed, onMounted, onUnmounted } from 'vue'
import SideMenu from './SideMenu.vue'
import { RouterLink, useRoute } from 'vue-router'

const showSearch = ref(false)
const searchInput = ref(null)
const showMenu = ref(false)
const scrollY = ref(0)
const route = useRoute()

function closeSearch() {
  showSearch.value = false
}
function openMenu() {
  showMenu.value = true
}
function closeMenu() {
  showMenu.value = false
}

watch(showSearch, async (val) => {
  if (val) {
    await nextTick()
    searchInput.value?.focus()
  }
})

// Função para atualizar a posição do scroll
function handleScroll() {
  scrollY.value = window.scrollY
}

// Verifica se está na página inicial
const isHomePage = computed(() => {
  return route.path === '/' || route.path === '/LoginPage'
})

// Header fica transparente APENAS na home E quando scroll está no topo
const isTransparent = computed(() => {
  return isHomePage.value && scrollY.value === 0
})

// Adiciona/remove o listener de scroll
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    :class="{ 'bg-transparent ': isTransparent, 'bg-black shadow-md': !isTransparent }" 
    class=" relative h-16 sticky top-0 z-30 transition-colors duration-300"
  >
    <!-- SideMenu -->
    <SideMenu :open="showMenu" @close="closeMenu" />

    <div class="mx-auto px-12 relative z-10 h-full">
      <div class="flex items-center justify-between h-full">
        <!-- menu + pesquisa -->
        <div class="flex items-center space-x-4">
          <button class="text-gray-900 dark:text-white cursor-pointer" @click="openMenu">
            <img src="/src/images/icons8-cardápio-50.png" alt="Menu icon" class="h-6 w-6" />
          </button>

          <!-- input com lupa (aparece  em telas grandes) -->
          <div class="relative hidden lg:block">
            <input
              type="text"
              placeholder=""
              class="text-white rounded-4xl px-3 py-0.5 pr-10 focus:outline-none ring-1 ring-white bg-transparent"
            />
            <img
              src="/src/images/Search.png"
              alt="Search"
              class="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>

          <!-- lupa visível em telas pequenas -->
          <button class="lg:hidden" @click="showSearch = true">
            <img src="/src/images/Search.png" alt="Search icon" class="w-5 h-5" />
          </button>
        </div>

        <!-- logo -->
        <div
          class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
        
          <RouterLink to="/"><img
            src="/src/images/cribLogo_no_background 1.png"
            alt="Logo"
            class="h-8"
          />
          </RouterLink>
        </div>

        <!-- ícones -->
        <div class="flex space-x-8"> 
          <RouterLink to="/LoginPage">
            <img src="/src/images/User.png" alt="" class="h-6" />
          </RouterLink>
          <RouterLink to="/">
            <img src="/src/images/Shopaholic.png" alt="" class="h-6" />
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- overlay que cobre toda a tela para detectar clique fora -->
    <transition name="fade">
      <div
        v-if="showSearch"
        class="fixed inset-0 z-20"
        @click="closeSearch"
      >
        <!-- área preta só na altura do header -->
        <div
          class="bg-black flex items-center justify-center mx-auto"
          style="height: 64px; max-width: 100vw;"
          @click.stop
        >
          <div class="relative w-4/5">
            <input
              ref="searchInput"
              type="text"
              placeholder="Pesquisar..."
              class="w-full text-white bg-black border border-white rounded-4xl px-4 py-2 pr-10 focus:outline-none"
            />
            <!-- lupa dentro do input -->
            <img
              src="/src/images/Search.png"
              alt="Search icon"
              class="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>