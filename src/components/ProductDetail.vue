<template>
  <div class="product-component flex justify-center items-center mt-50">
    <div class="product-page flex-wrap">
      <div class="product-image">
        <img class="img-product" :src="currentImage" :alt="product?.nome" />
      </div>

      <div class="product-info" v-if="product">
        <h1>{{ product.nome }}</h1>
        <p class="category">{{ product.categoria?.nome }}</p>

        <p v-if="product.estoque > 10" class="stock in-stock">Em Estoque</p>
        <p v-else-if="product.estoque > 1" class="stock low-stock">Quase Esgotado</p>
        <p v-else class="stock out-of-stock">Fora de Estoque</p>

        <div class="price">
          <span class="discount-price">
            R$ {{ discountedPrice.toFixed(2).replace('.', ',') }} no Pix
          </span>
          <span class="original-price">
            R$ {{ totalPrice.toFixed(2).replace('.', ',') }}
          </span>
        </div>

        <div class="sizes">
          <div class="size-buttons flex-wrap">
            <div
              v-for="img in product.imagens"
              :key="img.id || img.url"
              @mouseover="changeImage(img.url)"
              @mouseout="resetZoom"
              class="color-circle mx-auto flex items-center justify-center"
            >
              <img :src="img.url" alt="" />
            </div>
          </div>
        </div>

        <div class="quantity">
          <button @click="decrement">-</button>
          <span>{{ quantity }}</span>
          <button @click="increment">+</button>
        </div>

        <button
          class="add-to-cart"
          :class="{ disabledButton: product.estoque < 1 }"
          :disabled="product.estoque < 1"
          @click="addToCart"
        >
          Adicionar ao carrinho
        </button>
      </div>

      <div v-else class="loading">Carregando produto...</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'

const route = useRoute()
const productId = ref(Number(route.params.id))
const product = ref(null)
const quantity = ref(1)
const currentImageSrc = ref('')
const backendURL = 'https://bycrib-back-x7zl.onrender.com'

// Computed prices
const basePrice = computed(() => product.value?.preco || 0)
const totalPrice = computed(() => basePrice.value * quantity.value)
const discountedPrice = computed(() => totalPrice.value * 0.9)
const currentImage = computed(() => currentImageSrc.value || product.value?.imagens?.[0]?.url)

// Fetch produto do backend
async function fetchProduct() {
  try {
    const res = await axios.get(`${backendURL}/api/produtos/${productId.value}/`)
    product.value = res.data

    // Corrige URLs relativas das imagens
    if (product.value?.imagens?.length > 0) {
      product.value.imagens = product.value.imagens.map(img => ({
        ...img,
        url: img.url.startsWith('http') ? img.url : backendURL + img.url
      }))
      currentImageSrc.value = product.value.imagens[0].url
    }
  } catch (err) {
    console.error('Erro ao buscar produto:', err)
  }
}

onMounted(fetchProduct)

watch(
  () => route.params.id,
  async (newId) => {
    productId.value = Number(newId)
    quantity.value = 1
    await fetchProduct()
  }
)

// Quantidade
const increment = () => quantity.value++
const decrement = () => { if (quantity.value > 1) quantity.value-- }

// Imagem hover
const changeImage = newImage => { currentImageSrc.value = newImage }
const resetZoom = () => { currentImageSrc.value = product.value?.imagens?.[0]?.url }

// Carrinho (simulação)
const addToCart = () => {
  if (product.value && product.value.estoque > 0) {
    console.log('Produto adicionado ao carrinho:', {
      id: product.value.id,
      nome: product.value.nome,
      preco: product.value.preco,
      quantidade: quantity.value,
      imagem: currentImageSrc.value
    })
    alert('Produto adicionado ao carrinho! (Simulação)')
  }
}
</script>

<style scoped>
/* Mantive exatamente o CSS original do seu template */
.product-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;
  gap: 60px;
}

.zoomed {
  transform: scale(1.05);
  transition: 0.5s all ease;
}

.product-image {
  max-height: 500px;
  min-height: 500px;
  background: #f7f7f7;
  display: flex;
  border-radius: 12px;
}

.product-image img {
  width: 450px;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
  padding: 20px;
  transition: 0.5s all ease;
}

.img-product:hover {
  transform: scale(1.05);
  transition: 0.5s;
  cursor: pointer;
}

.color-circle:hover .img-product {
  transform: scale(1.05);
  transition: 0.5s;
  cursor: pointer;
}

.product-info {
  max-width: 400px;
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.category {
  color: gray;
  margin-bottom: 20px;
}

.stock {
  margin-bottom: 15px;
  font-weight: 500;
}

.in-stock {
  color: #2ecc71;
}

.low-stock {
  color: #f39c12;
}

.out-of-stock {
  color: #e74c3c;
}

.price {
  margin-bottom: 20px;
}

.discount-price {
  font-weight: bold;
  font-size: 1.5rem;
  color: #222;
  margin-right: 10px;
}

.original-price {
  text-decoration: line-through;
  color: #999;
}

.sizes p {
  margin-bottom: 8px;
}

.size-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.quantity button {
  width: 30px;
  height: 30px;
  background: #f0f0f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
}

.add-to-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  margin-bottom: 20px;
}

.disabledButton {
  opacity: 0.5;
  cursor: not-allowed;
}

.color-circle {
  width: 10rem;
  height: 10rem;
  display: inline-block;
  cursor: pointer;
  border: 1px solid #ccc;
}

@media (max-width: 420px) {
  .product-page {
    width: 100%;
  }
  .product-image img {
    width: 100%;
    height: auto;
  }
  .product-info {
    max-width: 100%;
  }
}
@media (max-width: 900px) {
  .product-component {
    margin-top: 10px;
  }
}
</style>
