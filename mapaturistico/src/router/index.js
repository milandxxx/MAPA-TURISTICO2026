import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import LoginPage from '../views/LoginPage.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/map', component: MapView },
  { path: '/login', component: LoginPage },
  { path: '/admin', component: AdminView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
