<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="component-card flex flex-col w-72 justify-center">
    <!-- Link para página de detalhes --->
    <RouterLink :to="`/product/${props.product.id}`" class="flex flex-col justify-baseline items-baseline">
      <!-- Imagem -->
      <div class="img-content flex justify-center items-center">
        <img :src="currentImage" class="w-72" @mouseover="showVariantImage" @mouseout="resetImage" />
      </div>

      <!-- Nome e Preço -->
      <div class="flex flex-col gap-1">
        <h1 class="font-semibold text-lg">{{ props.product.nome }}</h1>
        <h2 class="text-gray-800">
          R${{ Number(props.product.preco).toFixed(2).replace(".", ",") }}
        </h2>
        <span class="text-xs text-gray-600">
          2x de R${{ (props.product.preco / 2).toFixed(2).replace(".", ",") }}
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
  transition: 0.5s all ease;
}

.component-card:hover {
  transform: scale(1.05);
  transition: 0.5s;
  cursor: pointer;
}

img {
  height: auto;
  transition: 0.5s all ease;
}

img:hover {
  transform: scale(1.03);
  transition: 0.5s;
  cursor: pointer;
}

.img-content {
  height: 300px;
  max-height: 300px;
  min-height: 300px;
  overflow: hidden;
}
</style>
