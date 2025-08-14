<script setup>
 import CardComponent from '@/components/CardComponent.vue';
</script>

<template>
  <div id="app">
    
    <card-component
      v-for="product in products"
      :key="product.id"
      :product="product"
      class="mb-4"
    />
    
  </div>
</template>


<style scoped>

</style>
