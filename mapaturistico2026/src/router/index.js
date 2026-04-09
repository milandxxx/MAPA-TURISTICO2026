import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Map from '../views/MapView.vue'
import Login from '../views/LoginPage.vue'
import Admin from '../views/AdminView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/mapa', component: Map },
  { path: '/login', component: Login },
  { path: '/admin', component: Admin, meta: { auth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !localStorage.getItem('auth')) next('/login')
  else next()
})

export default router
