<template>
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-center">
        Cadastro de Opções para a Questão
      </h2>
      <div v-if="question">
        <p><strong>Descrição da Questão:</strong> {{ question.description }}</p>
        <p><strong>Nível:</strong> {{ question.level }}</p>
      </div>
      <form @submit.prevent="submitOptions" class="space-y-4">
        <div v-for="(option, index) in options" :key="index" class="space-y-2">
          <div>
            <label
              :for="'option-' + index"
              class="block text-sm font-medium text-gray-700"
            >
              Descrição da Opção
            </label>
            <input
              :id="'option-' + index"
              v-model="option.description"
              type="text"
              placeholder="Texto da opção"
              required
              class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="flex items-center space-x-2">
            <input
              type="checkbox"
              :id="'is-correct-' + index"
              v-model="option.is_correct"
              class="rounded focus:ring-indigo-500"
            />
            <label
              :for="'is-correct-' + index"
              class="text-sm font-medium text-gray-700"
            >
              Correta
            </label>
          </div>
          <button
            type="button"
            @click="removeOption(index)"
            class="text-red-500 text-sm hover:underline"
          >
            Remover Opção
          </button>
        </div>
        <button
          type="button"
          @click="addOption"
          class="mt-2 text-indigo-600 text-sm hover:underline"
        >
          Adicionar Opção
        </button>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Salvar Opções
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        question: null,
        options: [{ description: "", is_correct: false }],
      };
    },
    methods: {
      async fetchQuestion() {
        const questionId = this.$route.params.questionId;
        const response = await axios.get(
          `http://localhost:3000/questions/${questionId}`
        );
        this.question = response.data;
      },
      addOption() {
        this.options.push({ description: "", is_correct: false });
      },
      removeOption(index) {
        this.options.splice(index, 1);
      },
      async submitOptions() {
        const questionId = this.$route.params.questionId;
        try {
          for (const option of this.options) {
            await axios.post("http://localhost:3000/answers", {
              question_id: questionId,
              description: option.description,
              is_correct: option.is_correct,
            });
          }
          alert("Opções cadastradas com sucesso!");
          this.$router.push({ name: "AnswersForm" });
        } catch (error) {
          console.error("Erro ao cadastrar opções:", error);
        }
      },
    },
    mounted() {
      this.fetchQuestion();
    },
  };
  </script>
  