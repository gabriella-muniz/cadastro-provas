<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-md">
    <h2 class="text-2xl font-semibold mb-4 text-center">Cadastro de Escolas</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Nome da escola</label
        >
        <input
          id="name"
          v-model="school.name"
          type="text"
          placeholder="Nome da escola"
          required
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label for="idLegacy" class="block text-sm font-medium text-gray-700"
          >ID/Legacy (opcional)</label
        >
        <input
          id="idLegacy"
          v-model="school.idLegacy"
          type="text"
          placeholder="ID/Legacy (opcional)"
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
      >
        Salvar
      </button>
    </form>
    <!-- Mensagem de confirmação -->
    <div
      v-if="message"
      class="mt-4 text-center text-white bg-green-500 py-2 rounded-md"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      school: {
        name: "",
        idLegacy: "",
      },
      message: "", // Mensagem de confirmação
    };
  },
  methods: {
    async checkIfSchoolExists(name) {
      const response = await axios.get("http://localhost:3000/schools");
      const existingSchool = response.data.find(
        (school) => school.name.toLowerCase() === name.toLowerCase()
      );
      return existingSchool;
    },
    async submitForm() {
      // Verifica se a escola já existe
      const exists = await this.checkIfSchoolExists(this.school.name);
      if (exists) {
        alert("Esta escola já foi cadastrada!");
        return;
      }
      const response = await axios.post("http://localhost:3000/schools", {
        ...this.school,
        idLegacy: this.school.idLegacy || null,
      });
      this.schools.push(response.data);
      this.school.name = "";
      this.school.idLegacy = "";

      // Exibe a mensagem de sucesso
      this.message = "Escola cadastrada com sucesso!";
    },

    // Função para buscar todas as escolas
    async fetchSchools() {
      const response = await axios.get("http://localhost:3000/schools");
      this.schools = response.data; // Atualiza a lista de escolas com a resposta da API
    },
  },
  mounted() {
    // Chama a função para pegar as escolas da API ao carregar a aplicação
    this.fetchSchools();
  },
};
</script>
