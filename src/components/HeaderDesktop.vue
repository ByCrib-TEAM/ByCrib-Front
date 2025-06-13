<script setup>
import { ref, watch, nextTick } from 'vue'
import SideMenu from './SideMenu.vue'

const showSearch = ref(false)
const searchInput = ref(null)
const showMenu = ref(false)

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
</script>

<template>
  <header class="bg-black shadow-md relative h-16 sticky top-0 z-30">
    <!-- SideMenu -->
    <SideMenu :open="showMenu" @close="closeMenu" />

    <div class="mx-auto px-12 relative z-10 h-full">
      <div class="flex items-center justify-between h-full">
        <!-- menu + pesquisa -->
        <div class="flex items-center space-x-4">
          <button class="text-gray-900 dark:text-white cursor-pointer" @click="openMenu">
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          <!-- input com lupa (aparece  em telas grandes) -->
          <div class="relative hidden lg:block">
            <input
              type="text"
              placeholder=""
              class="text-white rounded-4xl px-3 py-0.5 pr-10 focus:outline-none ring-1 ring-white"
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
          <img
            src="/src/images/cribLogo_no_background 1.png"
            alt="Logo"
            class="h-8"
          />
        </div>

        <!-- ícones -->
        <div class="flex space-x-8">
          <img src="/src/images/User.png" alt="" class="h-6" />
          <img src="/src/images/Shopaholic.png" alt="" class="h-6" />
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
