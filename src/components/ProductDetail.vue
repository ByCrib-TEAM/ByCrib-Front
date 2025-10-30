<template>
  <div class="product-component flex justify-center items-center mt-16">
    <div class="product-page flex-wrap">
      <div class="product-image">
        <img class="img-product" :src="currentImage" :alt="product?.nome" />
      </div>

      <div class="product-info" v-if="product">
        <h1>{{ product.nome }}</h1>
        <p class="category" v-if="product.categoria">{{ product.categoria.nome }}</p>

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

        <div class="sizes" v-if="product.imagens && product.imagens.length > 1">
          <div class="size-buttons flex-wrap">
            <div
              v-for="(img, index) in product.imagens"
              :key="index"
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
import { ref, computed, onMounted } from 'vue'

const product = ref(null)
const quantity = ref(1)
const currentImageSrc = ref('')

// Computed prices
const basePrice = computed(() => {
  const preco = product.value?.preco || 0
  return typeof preco === 'string' ? parseFloat(preco) : preco
})
const totalPrice = computed(() => basePrice.value * quantity.value)
const discountedPrice = computed(() => totalPrice.value * 0.9)
const currentImage = computed(() => {
  if (currentImageSrc.value) return currentImageSrc.value
  if (product.value?.imagens?.length > 0) return product.value.imagens[0].url
  if (product.value?.imagem_url) return product.value.imagem_url
  return ''
})

onMounted(() => {
  // Recupera o produto do sessionStorage
  const produtoSalvo = sessionStorage.getItem('produto-selecionado')
  
  console.log('Produto salvo:', produtoSalvo) // Debug
  
  if (produtoSalvo) {
    const produtoData = JSON.parse(produtoSalvo)
    product.value = produtoData
    
    console.log('Produto carregado:', produtoData) // Debug
    
    // Se o produto tem imagens array
    if (produtoData.imagens?.length > 0) {
      currentImageSrc.value = produtoData.imagens[0].url
    } 
    // Se o produto tem apenas imagem_url (formato do card)
    else if (produtoData.imagem_url) {
      // Cria um array de imagens com a imagem principal
      product.value.imagens = [{ url: produtoData.imagem_url }]
      currentImageSrc.value = produtoData.imagem_url
    }
    
    // Limpa o sessionStorage após usar (opcional)
    // sessionStorage.removeItem('produto-selecionado')
  } else {
    console.error('Nenhum produto encontrado no sessionStorage')
  }
})

// Quantidade
const increment = () => quantity.value++
const decrement = () => { if (quantity.value > 1) quantity.value-- }

// Imagem hover
const changeImage = newImage => { currentImageSrc.value = newImage }
const resetZoom = () => { 
  if (product.value?.imagens?.length > 0) {
    currentImageSrc.value = product.value.imagens[0].url
  } else if (product.value?.imagem_url) {
    currentImageSrc.value = product.value.imagem_url
  }
}

// Carrinho
const addToCart = () => {
  if (product.value && product.value.estoque > 0) {
    console.log('Produto adicionado ao carrinho:', {
      id: product.value.id,
      nome: product.value.nome,
      preco: product.value.preco,
      quantidade: quantity.value,
      imagem: currentImage.value
    })
    alert('Produto adicionado ao carrinho! (Simulação)')
  }
}
</script>

<style scoped>
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