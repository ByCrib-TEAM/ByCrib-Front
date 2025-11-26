<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

// Estado do carrinho (vazio inicialmente)
// Estrutura esperada: { id, name, price, quantity, image }
const cartItems = ref([])

const updateQuantity = (id, newQuantity) => {
  if (newQuantity === 0) {
    removeItem(id)
    return
  }
  const item = cartItems.value.find(item => item.id === id)
  if (item) {
    item.quantity = newQuantity
  }
}

const removeItem = (id) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id)
}

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})
</script>

<template>
  <!-- Overlay -->
  <transition name="fade">
    <div 
      v-if="open"
      class="fixed inset-0 bg-black opacity-20 z-40"
      @click="emit('close')"
    />
  </transition>

  <!-- Carrinho Sidebar -->
  <transition name="slide">
    <div 
      v-if="open"
      class="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-3 border-b bg-black border-gray-200">
        <div class="flex items-center gap-2">
          <img src="/src/images/Shopaholic.png" alt="Cart" class="h-6 w-6" />
          <h2 class="text-xl font-semibold text-white">Carrinho</h2>
          <span v-if="totalItems > 0" class=" text-black text-xs rounded-full px-2 py-1">
            {{ totalItems }}
          </span>
        </div>
        <button 
          @click="emit('close')"
          class="p-2 text-white hover:bg-gray-100 hover:text-black rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Conteúdo -->
      <div class="flex-1 overflow-y-auto">
        <!-- Carrinho Vazio -->
        <div v-if="cartItems.length === 0" class="flex flex-col items-center justify-center h-full px-6 text-center">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <img src="/src/images/Shopaholic.png" alt="Empty cart" class="h-12 w-12 opacity-40" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Seu carrinho está vazio</h3>
          <p class="text-gray-500 mb-6">
            Adicione produtos ao seu carrinho para começar suas compras
          </p>
          <button 
            @click="emit('close')"
            class="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continuar Comprando
          </button>
        </div>

        <!-- Lista de Produtos -->
        <div v-else class="p-4 space-y-4">
          <div v-for="item in cartItems" :key="item.id" class="flex gap-4 p-3 border border-gray-200 rounded-lg">
            <!-- Imagem do Produto -->
            <div class="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
              <img 
                v-if="item.image"
                :src="item.image" 
                :alt="item.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <img src="/src/images/Shopaholic.png" alt="Product" class="h-8 w-8 opacity-40" />
              </div>
            </div>

            <!-- Informações do Produto -->
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-medium text-sm mb-1">{{ item.name }}</h3>
                <p class="text-lg font-semibold">
                  R$ {{ item.price.toFixed(2) }}
                </p>
              </div>

              <!-- Controles de Quantidade -->
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center gap-2 border border-gray-300 rounded-md">
                  <button
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="p-1 hover:bg-gray-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <span class="px-3 font-medium">{{ item.quantity }}</span>
                  <button
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="p-1 hover:bg-gray-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <button
                  @click="removeItem(item.id)"
                  class="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer com Total e Botão de Checkout -->
      <div v-if="cartItems.length > 0" class="border-t border-gray-200 p-4 space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold">Subtotal:</span>
          <span class="text-2xl font-bold">
            R$ {{ subtotal.toFixed(2) }}
          </span>
        </div>
        <button class="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
          Finalizar Compra
        </button>
        <button 
          @click="emit('close')"
          class="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Continuar Comprando
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>