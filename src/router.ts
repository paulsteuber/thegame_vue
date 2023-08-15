import { createRouter, createWebHistory } from "vue-router";

import Setup from "./pages/Setup.vue";
import Game from "./pages/Play.vue";

const routes = [
  { path: "/", component: Setup },
  { path: "/play", component: Game },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
