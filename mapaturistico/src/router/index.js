import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import LugarView from '../views/LugarView.vue'
import LoginView from '../views/LoginView.vue'
import { auth } from '../auth/auth.js'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/mapa', name: 'mapa', component: MapView },
  { path: '/lugar/:id', name: 'lugar', component: LugarView, props: true },
  { path: '/login', name: 'login', component: LoginView },
  // Ruta comodín: redirige cualquier URL inválida al inicio
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegación: protege rutas que requieren ser admin
router.beforeEach((to, from, next) => {
  if (to.meta?.requiresAdmin && !auth.isAdmin()) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router