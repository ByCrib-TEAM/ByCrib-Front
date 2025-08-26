<script setup>
import HeaderDesktop from './components/HeaderDesktop.vue';
import FooterPage from './components/FooterPage.vue';
 
</script>

<template>
  <div id="app">
    <HeaderDesktop />
    
    
    <router-view />

    <div class="imagehome"> <img src="../src/images/Home.png" alt="" />
    
    </div>

    <FooterPage />
  </div>
</template>


<style scoped>

.imagehome {
  display: flex;
  align-items: center;
  justify-content: center
}

.imagehome img {
  width: 100%;
  height: auto;
}

</style>
