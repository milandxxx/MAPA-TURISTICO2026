import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/public/HomeView.vue'
import MapaView from '../views/public/MapaView.vue'
import LoginView from '../views/admin/LoginView.vue'
import AdminPanelView from '../views/admin/AdminPanelView.vue'

const routes = [
  {
    path:'/',
    component:HomeView
  },
  {
    path:'/mapa/:id',
    component:MapaView
  },
  {
    path:'/login',
    component:LoginView
  },
  {
    path:'/admin',
    component:AdminPanelView,
    meta:{
      requiresAuth:true
    }
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

router.beforeEach((to,from,next)=>{

  const token = localStorage.getItem('token')

  if(to.meta.requiresAuth && !token){
    next('/login')
  }else{
    next()
  }

})

export default router