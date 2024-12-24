<template>
  <div id="app" class="font-sans text-gray-900 bg-gray-100 min-h-screen flex flex-col font-font">
    <!-- Cabeçalho com o título e os botões -->
    <header class="bg-[#1134d5] text-white py-8">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-3xl font-bold mb-6 font-font">Bem-vindo ao Sistema de Cadastro</h1>

        <!-- Botões de navegação -->
        <div class="space-x-4">
          <button
            @click="navigateTo('institutions')"
            class="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Cadastro de Instituições
          </button>
          <button
            @click="navigateTo('schools')"
            class="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Cadastro de Escolas
          </button>
        </div>
      </div>
    </header>

    <!-- Corpo com conteúdo da rota selecionada -->
    <main class="container mx-auto px-6 py-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    navigateTo(route) {
      this.$router.push(`/${route}`); 
    },
  },
};
</script>
