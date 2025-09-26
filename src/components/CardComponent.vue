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
  <div class="component-card flex flex-col w-72">
    <RouterLink
      :to="`/produto/${props.product.id}`"
      class="flex flex-col h-full"
    >
      <!-- Imagem -->
      <div class="img-content">
        <img
          :src="props.product.imagem.url"
          alt="Imagem do produto"
          class="product-image"
        />
      </div>

      <!-- Nome e Preço -->
      <div class="info-content">
        <h1 class="product-name">{{ props.product.nome }}</h1>
        <h2 class="product-price">
          R${{ Number(props.product.preco).toFixed(2).replace('.', ',') }}
        </h2>
        <span class="product-pix">
          Pix: R${{ (Number(props.product.preco) * 0.95).toFixed(2).replace('.', ',') }}
        </span>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.component-card {
  height: 400px;
  max-height: 400px;
  min-height: 400px;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.component-card:hover {
  transform: scale(1.03);
  cursor: pointer;
}

/* --- Imagem --- */
.img-content {
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: #f8f8f8;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.component-card:hover .product-image {
  transform: scale(1.05);
}

/* --- Informações --- */
.info-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
  text-align: left;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-price {
  font-size: 1rem;
  color: #1a1a1a;
  font-weight: 500;
}

.product-pix {
  font-size: 0.75rem;
  color: #047857;
  font-weight: 500;
}
</style>
