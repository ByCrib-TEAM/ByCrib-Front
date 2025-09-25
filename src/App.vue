<script setup>
import HeaderDesktop from './components/HeaderDesktop.vue';
import FooterPage from './components/FooterPage.vue';
 
</script>

<template>
  <div id="app">
    <HeaderDesktop />
    
    
    <router-view />

   

    <FooterPage />
  </div>
</template>


<style scoped>


</style>
