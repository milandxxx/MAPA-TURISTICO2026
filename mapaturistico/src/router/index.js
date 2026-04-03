<<<<<<< Updated upstream
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import LoginView from '../views/LoginView.vue'
import AdminPanelView from '../views/AdminPanelView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/mapa', name: 'mapa', component: MapView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/admin', name: 'admin', component: AdminPanelView }
=======
import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"
import MapView from "../views/MapView.vue"
import LoginPage from "../views/LoginPage.vue"
import AdminView from "../views/AdminView.vue"

const routes = [
  { path: "/", component: HomeView },
  { path: "/mapa", component: MapView },
  { path: "/login", component: LoginPage },
  { path: "/admin", component: AdminView }
>>>>>>> Stashed changes
]

export default createRouter({
  history: createWebHistory(),
  routes
})
<<<<<<< Updated upstream

export default router
=======
>>>>>>> Stashed changes
