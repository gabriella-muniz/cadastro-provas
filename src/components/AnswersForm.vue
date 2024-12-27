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
      <div v-for="(option, index) in options" :key="option.id || index" class="space-y-2">
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
    <!-- Exibir a mensagem de confirmação -->
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
      message: "", // Mensagem de feedback
      question: null, // Questão que será exibida
      options: [{ description: "", is_correct: false }], // Opções de respostas
    };
  },
  methods: {
    // Buscar a questão associada a essa página
    async fetchQuestion() {
      const questionId = this.$route.params.questionId;
      const response = await axios.get(
        `http://localhost:3000/questions/${questionId}`
      );
      this.question = response.data;
      // Definir as opções da questão existentes (se houver)
      this.options = this.question.answers || [{ description: "", is_correct: false }];
    },

    // Adicionar uma nova opção
    addOption() {
      this.options.push({ description: "", is_correct: false });
    },

    // Remover uma opção
    removeOption(index) {
      this.options.splice(index, 1);
    },

    // Submeter as opções para a API
    async submitOptions() {
      const questionId = this.$route.params.questionId;

      try {
        // Preparar as opções para salvar, preservando o 'id' se já existir
        const optionsToSave = this.options.map(option => ({
          id: option.id || Date.now().toString(), // Se 'id' existir, preserva; senão, gera um novo ID temporário
          question_id: questionId,
          description: option.description,
          is_correct: option.is_correct,
        }));

        // Atualizar a questão com as respostas
        const response = await axios.put(
          `http://localhost:3000/questions/${questionId}`,
          {
            // Preservar as informações da questão (description, level, etc.)
            description: this.question.description,
            level: this.question.level,
            levelLink: this.question.levelLink, // Caso haja esse campo
            answers: optionsToSave, // Atualizar as respostas com IDs
          }
        );

        // Exibir mensagem de sucesso após o envio das opções
        this.message = "Opções cadastradas com sucesso!";
        
        // Redireciona para a página de cadastro de respostas
        this.$router.push({ name: "AnswersForm" });

      } catch (error) {
        console.error("Erro ao cadastrar opções:", error);
        this.message = "Erro ao cadastrar opções. Tente novamente.";
      }
    },
  },
  mounted() {
    this.fetchQuestion();
  },
};
</script>
