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

                <!-- Miniaturas de imagens -->
                <div class="sizes">
                    <div class="size-buttons flex-wrap">
                        <div v-for="(img, index) in product.imagens" :key="index" @mouseover="changeImage(img.url)"
                            @mouseout="resetZoom" class="color-circle mx-auto flex items-center justify-center">
                            <img :src="img.url" alt="" />
                        </div>
                    </div>
                </div>

                <div class="quantity">
                    <button @click="decrement">-</button>
                    <span>{{ quantity }}</span>
                    <button @click="increment">+</button>
                </div>

                <button class="add-to-cart" :class="{ disabledButton: product.estoque < 1 }" @click="addToCart"
                    :disabled="product.estoque < 1">
                    Adicionar ao carrinho
                </button>
            </div>

            <div v-else class="loading">Carregando produto...</div>

            <AlertMessage ref="alertMessage" />
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, watch } from 'vue'
import AlertMessage from '@/components/AlertMessage.vue'
import { useCartStore } from '@/stores/cartStore'

// route param
const route = useRoute()
const productId = ref(Number(route.params.id))

// states
const product = ref(null)
const quantity = ref(1)
const alertMessage = ref(null)
const currentImageSrc = ref('')

// computed prices
const basePrice = computed(() => product.value?.preco || 0)
const totalPrice = computed(() => basePrice.value * quantity.value)
const discountedPrice = computed(() => totalPrice.value * 0.9)
const currentImage = computed(() => currentImageSrc.value || product.value?.imagens?.[0]?.url)

// fetch product do backend
onMounted(async () => {
    await fetchProduct()
})

watch(
    () => route.params.id,
    async newId => {
        productId.value = Number(newId)
        quantity.value = 1
        await fetchProduct()
    }
)

async function fetchProduct() {
    try {
        const res = await fetch(`https://bycrib-back-x7zl.onrender.com/api/produtos/${productId.value}/`)
        if (!res.ok) throw new Error('Erro ao buscar produto')
        product.value = await res.json()
        if (product.value?.imagens?.length > 0) {
            currentImageSrc.value = product.value.imagens[0].url
        }
    } catch (err) {
        console.error(err)
    }
}

// quantidade
const increment = () => { quantity.value++ }
const decrement = () => { if (quantity.value > 1) quantity.value-- }

// imagem hover
const changeImage = newImage => {
    currentImageSrc.value = newImage
}
const resetZoom = () => {
    currentImageSrc.value = product.value?.imagens?.[0]?.url
}

// carrinho
const cartStore = useCartStore()
const addToCart = () => {
    if (product.value && product.value.estoque > 0) {
        const productToAdd = {
            id: product.value.id,
            nome: product.value.nome,
            preco: product.value.preco,
            imagem: currentImageSrc.value
        }
        cartStore.addToCart(productToAdd, quantity.value)
        alertMessage.value.addMessage('Produto adicionado ao carrinho!')
    }
}
</script>
