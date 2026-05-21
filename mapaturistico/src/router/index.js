import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import MapView from "../views/MapaView.vue";
import AdminView from "../views/AdminPanelView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/mapa",
    name: "mapa",
    component: MapView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;