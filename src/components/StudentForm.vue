<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-md">
    <h2 class="text-2xl font-semibold mb-4 text-center">Cadastro de Alunos</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Campo para Matrícula -->
      <div>
        <label for="matricula" class="block text-sm font-medium text-gray-700">Matrícula</label>
        <input
          id="matricula"
          v-model="studentData.matricula"
          type="text"
          placeholder="Número da matrícula"
          required
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- Campo para Nome do Aluno -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nome do Aluno</label>
        <input
          id="name"
          v-model="studentData.name"
          type="text"
          placeholder="Nome completo"
          required
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- Campo para Escolha da Instituição -->
      <div>
        <label for="institution" class="block text-sm font-medium text-gray-700">Selecione a Instituição</label>
        <select
          id="institution"
          v-model="studentData.institutionName"
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
          v-model="studentData.schoolName"
          @change="onSchoolChange"
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

      <!-- Campo para Escolha da Turma -->
      <div>
        <label for="class" class="block text-sm font-medium text-gray-700">Selecione a Turma</label>
        <select
          id="class"
          v-model="studentData.className"
          required
          :disabled="classes.length === 0"
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="" disabled>Selecione uma turma</option>
          <option v-for="classItem in classes" :key="classItem.id" :value="classItem.name">
            {{ classItem.name }}
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
      studentData: {
        matricula: "",
        name: "",
        institutionName: "",
        schoolName: "", 
        className: "",
      },
      institutions: [], 
      schools: [], 
      classes: [], 
      message: "", 
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

    // Função para buscar as turmas de uma escola específica
    async fetchClasses(schoolName) {
      try {
        const response = await axios.get("http://localhost:3000/classes", {
          params: { schoolName },
        });
        this.classes = response.data;
      } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        this.classes = [];
      }
    },

    // Handler para quando a instituição é alterada
    onInstitutionChange() {
      this.studentData.schoolName = "";
      this.studentData.className = ""; 
      if (this.studentData.institutionName) {
        this.fetchSchools(this.studentData.institutionName);
      } else {
        this.schools = []; 
        this.classes = []; 
      }
    },

    // Handler para quando a escola é alterada
    onSchoolChange() {
      this.studentData.className = ""; 
      if (this.studentData.schoolName) {
        this.fetchClasses(this.studentData.schoolName); 
      } else {
        this.classes = []; 
      }
    },

    // Função para enviar o formulário de cadastro de aluno
    async submitForm() {
      try {
        await axios.post("http://localhost:3000/students", this.studentData);

        this.message = "Aluno cadastrado com sucesso!";

        // Limpa os campos do formulário após o envio
        this.studentData = {
          matricula: "",
          name: "",
          institutionName: "",
          schoolName: "",
          className: "",
        };

        // Limpa a mensagem após 3 segundos
        setTimeout(() => {
          this.message = "";
        }, 3000);
      } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        this.message = "Ocorreu um erro ao cadastrar o aluno.";
      }
    },
  },
  mounted() {
    // Busca as instituições e turmas ao carregar o componente
    this.fetchInstitutions();
  },
};
</script>
