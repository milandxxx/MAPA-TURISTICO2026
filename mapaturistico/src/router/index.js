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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
