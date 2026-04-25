import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Map from '../views/MapView.vue'
import Login from '../views/LoginPage.vue'
import Admin from '../views/AdminView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/map', component: Map },
  { path: '/login', component: Login },
  { path: '/admin', component: Admin }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
