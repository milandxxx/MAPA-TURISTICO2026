import { createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MappView from '../views/MappView.vue';
import LoginView from '../views/LoginView.vue';
import LugarView from '../views/LugarView.vue';
import AdminView from '../views/AdminView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/mapa', name: 'Mapa', component: MappView },
  { path: '/login', name: 'Login', component: LoginView },
  // { path: '/lugar', name: 'Lugar', component: LugarView },
  { path: '/admin', name: 'Admin', component: AdminView }
]