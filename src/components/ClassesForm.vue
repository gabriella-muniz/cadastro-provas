<template>
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-center">Cadastro de Turmas</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Campo para ID Legacy -->
        <div>
          <label for="id_legacy" class="block text-sm font-medium text-gray-700">ID Legacy</label>
          <input
            id="id_legacy"
            v-model="classData.id_legacy"
            type="text"
            placeholder="ID Legacy"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        <!-- Campo para Nome da Turma -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nome da Turma</label>
          <input
            id="name"
            v-model="classData.name"
            type="text"
            placeholder="Exemplo: 1º ANO A"
            required
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        <!-- Campo para Nível -->
        <div>
          <label for="level" class="block text-sm font-medium text-gray-700">Nível</label>
          <input
            id="level"
            v-model="classData.level"
            type="text"
            placeholder="Exemplo: 1º ANO"
            required
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        <!-- Campo para Escolha da Instituição -->
        <div>
          <label for="institution" class="block text-sm font-medium text-gray-700">Selecione a Instituição</label>
          <select
            id="institution"
            v-model="classData.institutionName"
            @change="onInstitutionChange"
            required
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>Selecione uma instituição</option>
            <option v-for="institution in institutions" :key="institution.id" :value="institution.name">
              {{ institution.name }}
            </option>
          </select>
        </div>
  
        <!-- Campo para Escolha da Escola -->
        <div>
          <label for="school" class="block text-sm font-medium text-gray-700">Selecione a Escola</label>
          <select
            id="school"
            v-model="classData.schoolName"
            required
            :disabled="schools.length === 0"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>Selecione uma escola</option>
            <option v-for="school in schools" :key="school.id" :value="school.name">
              {{ school.name }}
            </option>
          </select>
        </div>
  
        <!-- Botão de envio -->
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Salvar
        </button>
      </form>
  
      <!-- Mensagem de confirmação -->
      <div v-if="message" class="mt-4 text-center text-white bg-green-500 py-2 rounded-md">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        classData: {
          id_legacy: "",
          name: "",
          level: "",
          institutionName: "", // Campo para armazenar a instituição selecionada
          schoolName: "", // Campo para armazenar a escola selecionada
        },
        institutions: [], // Lista de instituições
        schools: [], // Lista de escolas da instituição selecionada
        message: "", // Mensagem de feedback
      };
    },
    methods: {
      // Função para buscar as instituições cadastradas
      async fetchInstitutions() {
        try {
          const response = await axios.get("http://localhost:3000/institutions");
          this.institutions = response.data;
        } catch (error) {
          console.error("Erro ao buscar instituições:", error);
        }
      },
  
      // Função para buscar as escolas de uma instituição específica
      async fetchSchools(institutionName) {
        try {
          const response = await axios.get("http://localhost:3000/schools", {
            params: { institutionName },
          });
          this.schools = response.data;
        } catch (error) {
          console.error("Erro ao buscar escolas:", error);
          this.schools = [];
        }
      },
  
      // Handler para quando a instituição é alterada
      onInstitutionChange() {
        this.classData.schoolName = ""; // Limpa o campo de escola
        if (this.classData.institutionName) {
          this.fetchSchools(this.classData.institutionName); // Busca as escolas da instituição selecionada
        } else {
          this.schools = []; // Limpa a lista de escolas
        }
      },
  
      // Função para enviar o formulário de cadastro de turma
      async submitForm() {
        try {
          await axios.post("http://localhost:3000/classes", this.classData);
  
          this.message = "Turma cadastrada com sucesso!";
  
          // Limpa os campos do formulário após o envio
          this.classData = {
            id_legacy: "",
            name: "",
            level: "",
            institutionName: "",
            schoolName: "",
          };
          this.schools = []; // Limpa as escolas também
  
          // Limpa a mensagem após 3 segundos
          setTimeout(() => {
            this.message = "";
          }, 3000);
        } catch (error) {
          console.error("Erro ao cadastrar turma:", error);
          this.message = "Ocorreu um erro ao cadastrar a turma.";
        }
      },
    },
    mounted() {
      // Busca as instituições ao carregar o componente
      this.fetchInstitutions();
    },
  };
  </script>
  
