<script setup>
import { ref, computed, onMounted } from 'vue'
import { getAllProducts } from '../services/produtos' // ajuste o caminho conforme seu projeto
import CardComponent from '../components/CardComponent.vue'
import { useRouter } from 'vue-router'

const produtos = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const response = await getAllProducts()
    produtos.value = response.results // pega só o array dentro do objeto retornado
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  }
})
// Estado reativo
const currentIndex = ref(0)
const itemsToShow = ref(4) // Responsivo
const isTransitioning = ref(true)

// Atualiza itemsToShow baseado no tamanho da tela
const updateItemsToShow = () => {
  const width = window.innerWidth
  if (width < 640) {
    itemsToShow.value = 1
  } else if (width < 768) {
    itemsToShow.value = 2
  } else if (width < 1024) {
    itemsToShow.value = 3
  } else {
    itemsToShow.value = 4
  }
}

onMounted(() => {
  updateItemsToShow()
  window.addEventListener('resize', updateItemsToShow)
})

// Cleanup
import { onUnmounted } from 'vue'
onUnmounted(() => {
  window.removeEventListener('resize', updateItemsToShow)
})

// Dados dos produtos
const products = ref([
  { id: 1, name: 'Bermudas', image: 'http://res.cloudinary.com/dhb2ioxtt/image/upload/v1759342032/oyld2ungtdlsv4k4ahpz.png', route: '/bermudas' },
  { id: 2, name: 'Calças', image: 'http://res.cloudinary.com/dhb2ioxtt/image/upload/v1759416288/ojvz9ju5sfnokg70naqn.png' },
  { id: 3, name: 'Camisetas', image: 'http://res.cloudinary.com/dhb2ioxtt/image/upload/v1759415388/o2wlyuubyd0wowqkuddn.png' },

  { id: 4, name: 'Jaquetas', image: 'http://res.cloudinary.com/dhb2ioxtt/image/upload/v1759494064/pbqwtbpqtkfnr4gjvrsu.png' },
  { id: 5, name: 'Tênis', image: 'https://res.cloudinary.com/doldutpvi/image/upload/v1764012232/tn1_b0vgia.png' },
  { id: 6, name: 'Bonés', image: 'https://res.cloudinary.com/doldutpvi/image/upload/v1764012235/capclass_fdv2az.png' }
])

// Cria um array infinito duplicando os produtos várias vezes
const infiniteProducts = computed(() => {
  const repeats = 10 // Repete os produtos 10 vezes
  return Array(repeats).fill(products.value).flat()
})

// Inicia no meio do array para permitir navegação nos dois sentidos
onMounted(() => {
  currentIndex.value = products.value.length * 5 // Começa no meio
  updateItemsToShow()
  window.addEventListener('resize', updateItemsToShow)
})

// Próximo slide
const nextSlide = () => {
  currentIndex.value++
  
  // Quando chegar perto do final, reseta para o meio sem animação
  setTimeout(() => {
    if (currentIndex.value >= products.value.length * 8) {
      isTransitioning.value = false
      currentIndex.value = products.value.length * 5
      setTimeout(() => {
        isTransitioning.value = true
      }, 50)
    }
  }, 500)
}

// Slide anterior
const prevSlide = () => {
  currentIndex.value--
  
  // Quando chegar perto do início, reseta para o meio sem animação
  setTimeout(() => {
    if (currentIndex.value <= products.value.length * 2) {
      isTransitioning.value = false
      currentIndex.value = products.value.length * 5
      setTimeout(() => {
        isTransitioning.value = true
      }, 50)
    }
  }, 500)
}

// Calcula o deslocamento
const translateX = computed(() => {
  const itemWidth = 100 / itemsToShow.value
  return -(currentIndex.value * itemWidth)
})

console.log(produtos.value)
</script>

<template>
  <div class="imagehome">
    <img src="../images/Home.png" alt="" />
  </div>

  <div class="products flex justify-center items-center mt-4 mb-6 text-4xl gap-2">
    <h1 class="font-bold">NAVEGUE</h1>
    <h1>POR CATEGORIA</h1>
  </div>

  <!-- Carrossel Infinito -->
  <div class="flex justify-center items-center px-8 mb-8">
    <div class="relative w-full max-w-5xl">
      <!-- Botão Anterior -->
      <button 
        @click="prevSlide"
        class="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200"
        aria-label="Produto anterior"
      >
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <!-- Container do Carrossel -->
      <div class="overflow-hidden bg-white rounded-2xl py-6">
        <div 
          class="flex items-center"
          :style="{
            transform: `translateX(${translateX}%)`,
            transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }"
        >
          <div 
            v-for="(product, index) in infiniteProducts" 
            :key="`${product.id}-${index}`"
            class="flex flex-col items-center space-y-4 flex-shrink-0 px-4"
            :style="{ width: `${100 / itemsToShow}%` }"
            @click="router.push(product.route)"
          >
            <!-- Círculo com a imagem -->
            <div class="relative group cursor-pointer">
              <div class="w-60 h-60 rounded-full border border-gray-300 overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 transform">
                <img 
                  :src="product.image" 
                  :alt="product.name" 
                  class="w-full h-full object-cover transition-transform duration-300"
                  loading="lazy"
                >
              </div>
            </div>
            <span class="text-sm font-semibold text-gray-800 text-center">{{ product.name }}</span>
          </div>
        </div>
      </div>

      <!-- Botão Próximo -->
      <button 
        @click="nextSlide"
        class="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200"
        aria-label="Próximo produto"
      >
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
    

  </div>
  <div>
    <h1 class="text-4xl font-bold text-center mb-8">
      MAIS VENDIDOS
    </h1>
    <CardComponent :produtos="produtos" />
  </div>

  <!-- Seção de Marcas -->
  <div class="flex justify-center items-center gap-14 mb-8 px-8">
    <div>
      <img src="../images/Nike.png" alt="">
    </div>
    <div class="flex flex-col gap-14">
      <img src="../images/Supreme.png" alt="">
      <img src="../images/Frame 39.png" alt="">
    </div>
  </div>

  <div>
    <h1 class="text-4xl font-bold text-center mb-8">
      MAIS VENDIDOS
    </h1>
    <CardComponent :produtos="produtos" />
  </div>
</template>

<style scoped>
.imagehome {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -64px;
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
</style>