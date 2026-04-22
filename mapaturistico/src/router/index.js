import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import LoginPage from '../views/LoginPage.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/mapa', component: MapView },
  { path: '/login', component: LoginPage },
  { path: '/admin', component: AdminView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('auth')
  if (to.meta.requiresAuth && !auth) next('/login')
  else next()
})

export default router
