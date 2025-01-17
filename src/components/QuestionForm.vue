<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-md">
    <h2 class="text-2xl font-semibold mb-4 text-center">Cadastro de Questões</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          id="description"
          v-model="question.description"
          placeholder="Descrição da questão"
          required
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
      <div>
        <label for="level" class="block text-sm font-medium text-gray-700">Nível</label>
        <select
          id="level"
          v-model="question.level"
          required
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="" disabled>Selecione o nível</option>
          <option value="facil">Fácil</option>
          <option value="medio">Médio</option>
          <option value="dificil">Difícil</option>
        </select>
      </div>
      <div>
        <label for="levelLink" class="block text-sm font-medium text-gray-700">Links Úteis</label>
        <input
          id="levelLink"
          v-model="question.levelLink"
          type="text"
          placeholder="Links úteis (opcional)"
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
      question: {
        description: "",
        level: "",
        levelLink: "",
      },
      message: "",
    };
  },
  methods: {
    async checkIfQuestionExists(description, level) {
      try {
        const response = await axios.get("http://localhost:3000/questions");
        const existingQuestion = response.data.find(
          (question) =>
            question.description.toLowerCase() === description.toLowerCase() &&
            question.level.toLowerCase() === level.toLowerCase()
        );
        return !!existingQuestion;
      } catch (error) {
        console.error("Erro ao verificar duplicidade:", error);
        return false;
      }
    },

    async submitForm() {
      // Verifica se a questão já existe
      const exists = await this.checkIfQuestionExists(this.question.description, this.question.level);
      if (exists) {
        alert("Uma questão com essa descrição e nível já foi cadastrada!");
        return;
      }

      try {
        // Adiciona a questão ao backend
        const response = await axios.post("http://localhost:3000/questions", {
          ...this.question,
          levelLink: this.question.levelLink || null,
        });

        // Limpa os campos após o envio
        this.question = {
          description: "",
          level: "",
          levelLink: "",
        };

        // Exibe mensagem de sucesso
        this.message = "Questão cadastrada com sucesso!";

        // Redireciona para a tela de cadastro de opções
        this.$router.push({ name: "AnswersForm", params: { questionId: response.data.id } });
      } catch (error) {
        console.error("Erro ao cadastrar questão:", error);
        this.message = "Erro ao cadastrar a questão.";
      }
    },
  },
};
</script>
