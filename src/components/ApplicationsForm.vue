<template>
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-center">Cadastro de Aplicações</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Campo para ID -->
        <div>
          <label for="id" class="block text-sm font-medium text-gray-700">ID</label>
          <input
            id="id"
            v-model="applicationData.id"
            type="text"
            placeholder="ID da aplicação"
            required
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        <!-- Campo para Data -->
        <div>
          <label for="date" class="block text-sm font-medium text-gray-700">Data</label>
          <input
            id="date"
            v-model="applicationData.date"
            type="date"
            required
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        <!-- Campo para Prova -->
        <div>
          <label for="exam" class="block text-sm font-medium text-gray-700">Prova</label>
          <input
            id="exam"
            v-model="applicationData.exam"
            type="text"
            placeholder="Nome da prova"
            required
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        <!-- Campo para Escola -->
        <div>
          <label for="school" class="block text-sm font-medium text-gray-700">Escola</label>
          <select
            id="school"
            v-model="applicationData.school"
            required
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option v-for="school in schools" :key="school.id" :value="school.id">
              {{ school.name }}
            </option>
          </select>
        </div>
  
        <!-- Campo para Nível -->
        <div>
          <label for="level" class="block text-sm font-medium text-gray-700">Nível</label>
          <select
            id="level"
            v-model="applicationData.level"
            required
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option v-for="level in levels" :key="level.id" :value="level.id">
              {{ level.name }}
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
        applicationData: {
          id: "",
          date: "",
          exam: "",
          school: null,
          level: null, // Adicionando o nível aqui
        },
        schools: [], // Lista de escolas
        levels: [], // Lista de níveis
        message: "",
      };
    },
    async mounted() {
      try {
        // Carregar as escolas existentes
        const schoolResponse = await axios.get("http://localhost:3000/schools");
        this.schools = schoolResponse.data;
  
        // Carregar os níveis existentes
        const levelResponse = await axios.get("http://localhost:3000/levels");
        this.levels = levelResponse.data;
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    },
    methods: {
      async submitForm() {
        try {
          // Enviar os dados da aplicação para o backend
          const response = await axios.post("http://localhost:3000/applications", this.applicationData);
  
          this.message = "Aplicação cadastrada com sucesso!";
  
          // Limpar os campos após o envio
          this.applicationData = {
            id: "",
            date: "",
            exam: "",
            school: null,
            level: null, // Limpar o nível também
          };
        } catch (error) {
          console.error("Erro ao cadastrar aplicação:", error);
          this.message = "Ocorreu um erro ao cadastrar a aplicação.";
        }
      },
    },
  };
  </script>
  