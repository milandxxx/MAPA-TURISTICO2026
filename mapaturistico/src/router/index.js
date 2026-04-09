import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD

import Home from '../views/HomeView.vue'
import Map from '../views/MapView.vue'
import Login from '../views/LoginPage.vue'
import Admin from '../views/AdminView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/mapa', component: Map },
  { path: '/login', component: Login },
  { path: '/admin', component: Admin, meta: { requiresAuth: true } }
=======

const routes = [
  { path: '/', component: () => import('../views/HomeView.vue') },
  { path: '/mapa', component: () => import('../views/MapView.vue') },
  { path: '/login', component: () => import('../views/LoginPage.vue') },
  { path: '/admin', component: () => import('../views/AdminView.vue') }
>>>>>>> origin/main
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
<<<<<<< HEAD
  const auth = localStorage.getItem('auth')

  if (to.meta.requiresAuth && !auth) {
=======
  const sesion = localStorage.getItem('sesion') === 'activa'
  if (to.path === '/admin' && !sesion) {
>>>>>>> origin/main
    next('/login')
  } else {
    next()
  }
})

export default router
