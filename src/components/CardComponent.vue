<script setup>
import { defineProps, ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Referência para a imagem atual
const currentImage = ref(props.product.imageURL)

// Função para mudar para a imagem da variante quando passar o mouse sobre a imagem principal
const showVariantImage = () => {
  // Verifica se o produto tem variantes antes de tentar acessá-las
  if (props.product.variants && props.product.variants.length > 0) {
    // Pega a primeira variante (ou você pode escolher uma específica se desejar)
    currentImage.value = props.product.variants[1].image
  }
}

// Restaurar a imagem original quando o mouse sair
const resetImage = () => {
  currentImage.value = props.product.imageURL
}
</script>

<template>
  <div class="component-card flex flex-col w-72 justify-center">
    <RouterLink :to="`/product/${props.product.id}`" class="flex flex-col justify-baseline items-baseline "> 
      <!-- A imagem principal agora tem eventos de mouseover/mouseout -->
       <div class="img-content flex justify-center items-center">
      <img 
        :src="currentImage" 
        class="w-72"
        @mouseover="showVariantImage"
        @mouseout="resetImage"
      >
      </div>
      <div class="flex flex-col gap-1">
        <h1>{{props.product.name}}</h1>
        <h2>R${{props.product.price.toFixed(2).replace('.',',')}}</h2>
        <span class="text-xs text-gray-900">2x de R${{(props.product.price / 2).toFixed(2).replace('.',',')}}</span>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.component-card, .component-card a{
    height: 400px;
    max-height: 400px;
    min-height: 400px;
    transition: 0.5s all ease;
}
.component-card:hover{
    transform: scale(1.05);
    transition: 0.5s;
    cursor: pointer;

}

img{
    height: auto;
    transition: 0.5s all ease;
}
img:hover{
    transform: scale(1.03);
    transition: 0.5s;
    cursor: pointer;
}

.img-content{
    height: 300px;
    max-height: 300px;
    min-height: 300px;
    overflow: hidden;
}
</style>