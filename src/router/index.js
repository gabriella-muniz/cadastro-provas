import { createRouter, createWebHistory } from "vue-router";
import InstitutionForm from "@/components/InstitutionForm.vue";
import SchoolForm from "@/components/SchoolForm.vue";
import StudentForm from "@/components/StudentForm.vue";
import QuestionForm from "@/components/QuestionForm.vue";
import AnswersForm from "../components/AnswersForm.vue";
import ClassesForm from "@/components/ClassesForm.vue";
import ExamsForm from "@/components/ExamsForm.vue";
import ApplicationsForm from "@/components/ApplicationsForm.vue";

const routes = [
  {
    path: "/institutions",
    name: "Institutions",
    component: InstitutionForm,
  },
  {
    path: "/schools",
    name: "Schools",
    component: SchoolForm,
  },
  { path: "/students", name: "Student", component: StudentForm },
  { path: "/question", name: "Question", component: QuestionForm },
  {
    path: "/answers/:questionId",
    name: "AnswersForm",
    component: AnswersForm,
  },
  {
    path: "/Classes",
    name: "ClassesForm",
    component: ClassesForm,
  },
  {
    path: "/Exams",
    name: "Exams",
    component: ExamsForm,
  },
  {
    path: "/Application",
    name: "Application",
    component: ApplicationsForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
