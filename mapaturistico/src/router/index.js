import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView.vue'
import Login from '../views/LoginPage.vue'
import Admin from '../views/AdminView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* 🔐 GUARD GLOBAL */
router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('auth') === 'true'

  if (to.path.startsWith('/admin') && !isAuth) {
    next('/login')
  } else {
    next()
  }
})

export default router