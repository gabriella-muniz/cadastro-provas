<template>
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-center">Cadastro de Alunos</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nome do Aluno</label>
          <input
            id="name"
            v-model="student.name"
            type="text"
            placeholder="Nome do aluno"
            required
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label for="register" class="block text-sm font-medium text-gray-700">Matrícula</label>
          <input
            id="register"
            v-model="student.register"
            type="text"
            placeholder="Matrícula"
            required
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label for="idLegacy" class="block text-sm font-medium text-gray-700">ID/Legacy (opcional)</label>
          <input
            id="idLegacy"
            v-model="student.idLegacy"
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
        student: {
          name: "",
          register: "",
          idLegacy: "",
        },
        message: "", // Mensagem de confirmação
      };
    },
    methods: {
      async checkIfStudentExists(register) {
        const response = await axios.get("http://localhost:3000/students");
        const existingStudent = response.data.find(
          (student) => student.register.toLowerCase() === register.toLowerCase()
        );
        return existingStudent;
      },
      async submitForm() {
        // Verifica se o aluno já existe
        const exists = await this.checkIfStudentExists(this.student.register);
        if (exists) {
          alert("Este aluno já foi cadastrado!");
          return;
        }
        const response = await axios.post("http://localhost:3000/students", {
          ...this.student,
          idLegacy: this.student.idLegacy || null,
        });
        this.students.push(response.data);
        this.student.name = "";
        this.student.register = "";
        this.student.idLegacy = "";
  
        // Exibe a mensagem de sucesso
        this.message = "Aluno cadastrado com sucesso!";
      },
  
      // Função para buscar todos os alunos
      async fetchStudents() {
        const response = await axios.get("http://localhost:3000/students");
        this.students = response.data; // Atualiza a lista de alunos com a resposta da API
      },
    },
    mounted() {
      // Chama a função para pegar os alunos da API ao carregar a aplicação
      this.fetchStudents();
    },
  };
  </script>
  