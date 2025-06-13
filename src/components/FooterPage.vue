<template>
  <footer class="bg-black text-white px-6 py-10 text-center space-y-6">
    <!-- arroba e ícone instagram -->
    <div class="space-y-2">
      <h1 class="text-2xl font-bold">@bycrib</h1>
      <img src="/src/images/instagram-icon.png" alt="Instagram" class="mx-auto h-5 w-5" />
    </div>

    <!-- menu de navegação -->
    <nav class="flex flex-wrap justify-center gap-6 text-xl font-light">
      <a href="#" class="hover:underline">Início</a>
      <a href="#" class="hover:underline">Produtos</a>
      <a href="#" class="hover:underline">News Letter</a>
      <a href="#" class="hover:underline">Contato</a>
      <a href="#" class="hover:underline">Trocas e devoluções</a>
      <a href="#" class="hover:underline">Sobre Nós</a>
    </nav>

    <!-- input da newsletter -->
    <div class="max-w-md mx-auto">
      <input 
        type="email" 
        placeholder="Assine nossa newsletter..." 
        class="w-full bg-black border border-white text-white text-center py-2 px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>

    <!-- copyright -->
    <div class="mt-4 font-light text-gray-200">
      <p>@Copyright ByCrib</p>
      <p>Todos os direitos reservados</p>
    </div>
  </footer>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');
</style>
