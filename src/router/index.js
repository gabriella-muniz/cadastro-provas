import { createRouter, createWebHistory } from 'vue-router';
import App from "@/App.vue";  // Página principal
import InstitutionForm from "@/components/InstitutionForm.vue"; // Cadastro de Instituições
import SchoolForm from "@/components/SchoolForm.vue"; // Cadastro de Escolas



const routes = [
    {
      path: "/",
      name: "App",
      component: App,  // Página principal com as opções de cadastro
    },
    {
      path: "/institutions",
      name: "Institutions",
      component: InstitutionForm,  // Página de cadastro de instituições
    },
    {
      path: "/schools",
      name: "Schools",
      component: SchoolForm,  // Página de cadastro de escolas
    },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
