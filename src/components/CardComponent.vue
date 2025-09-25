<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="component-card flex flex-col w-72 justify-center">
    <RouterLink :to="`/produto/${props.product.id}`" class="flex flex-col justify-baseline items-baseline">
      <!-- Imagem -->
      <div class="img-content flex justify-center items-center">
        <img :src="props.product.imagem.url" alt="Imagem do produto" class="w-72 object-cover" />
      </div>

      <!-- Nome e Preço -->
      <div class="flex flex-col gap-1 mt-2">
        <h1 class="font-semibold text-lg truncate">{{ props.product.nome }}</h1>

        <h2 class="text-gray-800">
          R${{ Number(props.product.preco).toFixed(2).replace('.', ',') }}
        </h2>

        <span class="text-xs text-green-700">
          Pix: R${{ (Number(props.product.preco) * 0.95).toFixed(2).replace('.', ',') }}
        </span>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.component-card,
.component-card a {
  height: 400px;
  max-height: 400px;
  min-height: 400px;
  transition: 0.3s all ease;
}

.component-card:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.img-content {
  height: 300px;
  max-height: 300px;
  min-height: 300px;
  overflow: hidden;
}
</style>
