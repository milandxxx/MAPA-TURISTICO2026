import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import LugarView from '../views/LugarView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/mapa', name: 'mapa', component: MapView },
  { path: '/lugar/:id', name: 'lugar', component: LugarView, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router