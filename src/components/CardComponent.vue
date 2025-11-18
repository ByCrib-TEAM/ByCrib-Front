<template>
  <div class="p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div
        v-for="produto in produtos"
        :key="produto.id"
        @click="goToProductDetail(produto)"
        class="bg-white shadow-md rounded-lg p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
      >
        <img
          :src="produto.imagem_url"
          :alt="produto.nome"
          class="w-full h-64 object-contain mb-4 mx-auto"
          loading="lazy"
        />
        <h2 class="text-base font-semibold mb-2 text-gray-800">{{ produto.nome }}</h2>
        <p class="text-lg font-bold text-gray-900">R$ {{ formatPreco(produto.preco) }}</p>
        <p class="text-sm text-gray-500 mt-1">4x de R$ {{ parcelamento(produto.preco) }} sem juros!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  produtos: {
    type: Array,
    required: true
  }
})

function formatPreco(preco) {
  const valor = typeof preco === 'string' ? parseFloat(preco) : preco;
  return valor.toFixed(2).replace('.', ',');
}

function parcelamento(preco) {
  const valor = typeof preco === 'string' ? parseFloat(preco) : preco;
  return (valor / 4).toFixed(2).replace('.', ',');
}

function goToProductDetail(produto) {
  
  // Armazena no sessionStorage
  sessionStorage.setItem('produto-selecionado', JSON.stringify(produto))
  
  // Navega para a página
  router.push({name: 'ProductDetail'})

  // scrollY.value;/ = 0
}
</script>