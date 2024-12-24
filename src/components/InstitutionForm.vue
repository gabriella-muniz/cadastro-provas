<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-md">
    <h2 class="text-2xl font-semibold mb-4 text-center">
      Cadastro de Instituições
    </h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Nome da instituição</label
        >
        <input
          id="name"
          v-model="institution.name"
          type="text"
          placeholder="Nome da instituição"
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
          v-model="institution.idLegacy"
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
      institution: {
        name: "",
        idLegacy: "",
      },
      message: "", // Mensagem de confirmação
    };
  },
  methods: {
    async checkIfInstitutionExists(name) {
      const response = await axios.get("http://localhost:3000/institutions");
      const existingInstitution = response.data.find(
        (institution) => institution.name.toLowerCase() === name.toLowerCase()
      );
      return existingInstitution;
    },
    async submitForm() {
      // Verifica se a instituição já existe
      const exists = await this.checkIfInstitutionExists(this.institution.name);
      if (exists) {
        alert("Esta instituição já foi cadastrada!");
        return;
      }
      const response = await axios.post("http://localhost:3000/institutions", {
        ...this.institution,
        idLegacy: this.institution.idLegacy || null,
      });
      this.institutions.push(response.data);
      this.institution.name = "";
      this.institution.idLegacy = "";

      // Exibe a mensagem de sucesso
      this.message = "Instituição cadastrada com sucesso!";

      // Limpa a mensagem após 3 segundos
      setTimeout(() => {
        this.message = "";
      }, 3000);
    },

    // Função para buscar todas as instituições
    async fetchInstitutions() {
      const response = await axios.get("http://localhost:3000/institutions");
      this.institutions = response.data; // Atualiza a lista de instituições com a resposta da API
    },
  },
  mounted() {
    // Chama a função para pegar as instituições da API ao carregar a aplicação
    this.fetchInstitutions();
  },
};
</script>
