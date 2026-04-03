import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/HomeView.vue') },
  { path: '/mapa', component: () => import('../views/MapView.vue') },
  { path: '/login', component: () => import('../views/LoginPage.vue') },
  { path: '/admin', component: () => import('../views/AdminView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const sesion = localStorage.getItem('sesion') === 'activa'
  if (to.path === '/admin' && !sesion) {
    next('/login')
  } else {
    next()
  }
})

export default router
