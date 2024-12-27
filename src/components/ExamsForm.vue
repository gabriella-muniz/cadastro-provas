<template>
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-center">Cadastro de Prova</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Campo para o Nível da Prova -->
        <div>
          <label for="level" class="block text-sm font-medium text-gray-700">Nível da Prova</label>
          <select
            id="level"
            v-model="examData.level"
            @change="filterQuestions"
            required
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Selecione o nível</option>
            <option value="facil">Fácil</option>
            <option value="medio">Médio</option>
            <option value="dificil">Difícil</option>
          </select>
        </div>
  
        <!-- Campo para selecionar as Questões -->
        <div>
          <label for="questions" class="block text-sm font-medium text-gray-700">Questões da Prova</label>
          <select
            id="questions"
            v-model="selectedQuestions"
            multiple
            required
            size="10"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <!-- Renderizar opções apenas se houver questões filtradas -->
            <option
              v-for="question in filteredQuestions"
              :key="question.id"
              :value="question.id"
            >
              {{ question.description }} 
            </option>
            <!-- Mensagem quando não há questões para exibir -->
            <option v-if="filteredQuestions.length === 0" disabled>
              Nenhuma questão encontrada para o nível selecionado.
            </option>
          </select>
          <p class="text-xs text-gray-500 mt-2">Selecione 10 questões para a prova.</p>
        </div>
  
        <!-- Botão de envio -->
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Salvar Prova
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
        examData: {
          level: "", // Nível da prova
        },
        questions: [], // Todas as questões cadastradas
        filteredQuestions: [], // Questões filtradas pelo nível
        selectedQuestions: [], // Questões selecionadas para a prova
        message: "",
      };
    },
    async mounted() {
      try {
        // Carregar todas as questões cadastradas
        const response = await axios.get("http://localhost:3000/questions");
        this.questions = response.data;
  
        // Inicializar com todas as questões disponíveis
        this.filteredQuestions = this.questions;
  
        console.log("Questões carregadas:", this.questions); // Log para depuração
      } catch (error) {
        console.error("Erro ao carregar questões:", error);
      }
    },
    methods: {
      filterQuestions() {
        console.log("Nível selecionado:", this.examData.level); // Debug
  
        // Garantir que o nível está definido e corresponde a alguma questão
        if (this.examData.level) {
          // Filtra as questões pelo nível selecionado
          this.filteredQuestions = this.questions.filter((question) => {
            return question.level.trim().toLowerCase() === this.examData.level.trim().toLowerCase();
          });
        } else {
          // Se nenhum nível for selecionado, todas as questões são exibidas
          this.filteredQuestions = this.questions;
        }
  
        console.log("Questões filtradas:", this.filteredQuestions); // Debug
  
        // Limpa as questões selecionadas ao mudar o nível
        this.selectedQuestions = [];
      },
      async submitForm() {
        // Verifica se exatamente 10 questões foram selecionadas
        if (this.selectedQuestions.length !== 10) {
          this.message = "Por favor, selecione exatamente 10 questões.";
          return;
        }
  
        try {
          // Dados para cadastrar a prova
          const examData = {
            level: this.examData.level,
            total_questions: 10, // Já definimos que serão 10 questões
            questions: this.selectedQuestions, // Questões selecionadas
          };
  
          // Enviar os dados para o servidor
          await axios.post("http://localhost:3000/exams", examData);
  
          // Mensagem de sucesso
          this.message = "Prova cadastrada com sucesso!";
  
          // Limpar dados após o envio
          this.examData = { level: "" };
          this.selectedQuestions = [];
          this.filteredQuestions = this.questions;
        } catch (error) {
          console.error("Erro ao cadastrar prova:", error);
          this.message = "Ocorreu um erro ao cadastrar a prova.";
        }
      },
    },
  };
  </script>
  