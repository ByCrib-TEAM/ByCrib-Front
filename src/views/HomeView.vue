<script setup>
import { ref, computed,  } from 'vue'

// Estado reativo
const currentIndex = ref(0)
const itemsToShow = ref(4)
 

// Dados dos produtos
const products = ref([
  { id: 1, name: 'Bermudas', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200&h=200&fit=crop&crop=center' },
  { id: 2, name: 'Calças', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop&crop=center' },
  { id: 3, name: 'Camisetas', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop&crop=center' },
  { id: 4, name: 'Polos', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=200&h=200&fit=crop&crop=center' },
  { id: 5, name: 'Jaquetas', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop&crop=center' },
  { id: 6, name: 'Tênis', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&crop=center' },
  { id: 7, name: 'Bonés', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&h=200&fit=crop&crop=center' }
])

// Propriedades computadas
const maxIndex = computed(() => products.value.length - itemsToShow.value)

const visibleProducts = computed(() => {
  const start = currentIndex.value
  const end = start + itemsToShow.value
  return products.value.slice(start, end)
})

 

// Métodos
const nextSlide = () => {
  currentIndex.value = currentIndex.value >= maxIndex.value ? 0 : currentIndex.value + 1
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value <= 0 ? maxIndex.value : currentIndex.value - 1
}

 

const isSpecialProduct = (productName) => {
  return productName === 'Polos'
}

</script>

<template>
  <div class="imagehome">
    <img src="../images/Home.png" alt="" />
  </div>

  <div class="products flex justify-center items-center mt-4 mb-6 text-4xl gap-2">
    <h1 class="font-bold">NAVEGUE</h1>
    <h1>POR CATEGORIA</h1>
  </div>

  <!-- Carrossel de Produtos -->
  <div class="flex justify-center items-center px-8 mb-8">
    <div class="relative w-full max-w-4xl" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
      <!-- Botão Anterior -->
      <button 
        @click="prevSlide"
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200"
        aria-label="Produto anterior"
      >
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <!-- Container do Carrossel -->
      <div class="overflow-hidden bg-white rounded-2xl ">
        <transition-group 
          name="carousel" 
          tag="div" 
          class="flex items-center justify-between space-x-8"
        >
          <div 
            v-for="product in visibleProducts" 
            :key="product.id"
            class="flex flex-col items-center space-y-4 flex-1 transition-all duration-300"
          >
            <!-- Círculo com a imagem -->
            <div class="relative group cursor-pointer">
              <div 
                :class="[
                  'w-58 h-58 rounded-full border-3 overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105',
                  isSpecialProduct(product.name) ? 'border-blue-500' : 'border-gray-200'
                ]"
              >
                <img 
                  :src="product.image" 
                  :alt="product.name" 
                  class="w-full h-full object-cover"
                  loading="lazy"
                >
              </div>
              <div class="absolute rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
            <span class="text-sm font-medium text-gray-700 text-center">{{ product.name }}</span>
          </div>
        </transition-group>

        <!-- Indicadores -->
        <div class="flex justify-center mt-6 space-x-2">
           
        </div>
      </div>

      <!-- Botão Próximo -->
      <button 
        @click="nextSlide"
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200"
        aria-label="Próximo produto"
      >
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.imagehome {
  display: flex;
  align-items: center;
  justify-content: center;
}

.imagehome img {
  width: 100%;
  height: auto;
}

.imagehome h1 {
  color: black;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.carousel-container {
  transition: transform 0.3s ease-in-out;
}

/* Animações para transições do carrossel */
.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.3s ease-in-out;
}

.carousel-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.carousel-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>