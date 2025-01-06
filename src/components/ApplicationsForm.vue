<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-md">
    <h2 class="text-2xl font-semibold mb-4 text-center">Cadastro de Aplicações</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Campo para Instituição -->
      <div>
        <label for="institution" class="block text-sm font-medium text-gray-700">Instituição</label>
        <select
          id="institution"
          v-model="applicationData.institution"
          @change="loadSchools"
          required
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="" disabled>Selecione uma instituição</option>
          <option v-for="institution in institutions" :key="institution.id" :value="institution.name">
            {{ institution.name }}
          </option>
        </select>
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
          <option value="" disabled>Selecione uma escola</option>
          <option v-for="school in schools" :key="school.id" :value="school.name">
            {{ school.name }}
          </option>
        </select>
      </div>

      <!-- Campo para Prova -->
      <div>
        <label for="exam" class="block text-sm font-medium text-gray-700">Prova</label>
        <select
          id="exam"
          v-model="applicationData.exam"
          required
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="" disabled>Selecione a prova</option>
          <option v-for="exam in exams" :key="exam.id" :value="exam.name">
            {{ exam.name }}
          </option>
        </select>
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
        date: "",
        exam: null,
        school: null,
        institution: null, 
      },
      institutions: [], 
      schools: [], 
      exams: [], 
      message: "",
    };
  },
  async mounted() {
    try {
      // Carregar as instituições existentes
      const institutionResponse = await axios.get("http://localhost:3000/institutions");
      this.institutions = institutionResponse.data;

      // Carregar as provas existentes
      const examResponse = await axios.get("http://localhost:3000/exams");
      this.exams = examResponse.data;
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  },
  methods: {
    async loadSchools() {
      // Verifica se uma instituição foi selecionada
      if (this.applicationData.institution) {
        try {
          // Carregar as escolas da instituição selecionada
          const schoolResponse = await axios.get(`http://localhost:3000/schools?institutionName=${this.applicationData.institution}`);
          this.schools = schoolResponse.data; 
        } catch (error) {
          console.error("Erro ao carregar escolas:", error);
        }
      } else {
        this.schools = []; 
      }
    },

    async submitForm() {
      try {
        // Modificar applicationData para enviar o nome das instituições e escolas
        const formData = {
          date: this.applicationData.date,
          exam: this.applicationData.exam,
          school: this.applicationData.school, // Envia o nome da escola
          institution: this.applicationData.institution, // Envia o nome da instituição
        };

        // Enviar os dados da aplicação para o backend
        const response = await axios.post("http://localhost:3000/applications", formData);

        this.message = "Aplicação cadastrada com sucesso!";

        // Limpar os campos após o envio
        this.applicationData = {
          date: "",
          exam: null,
          school: null,
          institution: null, 
        };
      } catch (error) {
        console.error("Erro ao cadastrar aplicação:", error);
        this.message = "Ocorreu um erro ao cadastrar a aplicação.";
      }
    },
  },
};
</script>
