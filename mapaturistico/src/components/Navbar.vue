<template>
  <nav class="navbar">
    <router-link to="/" class="nav-brand">
      <span class="brand-icon">🌴</span>
      <span>Santa Marta</span>
    </router-link>
    <div class="nav-links">
      <router-link to="/" class="nav-link" exact-active-class="active">Inicio</router-link>
      <router-link to="/mapa" class="nav-link" active-class="active">Mapa</router-link>
      <router-link v-if="isAdmin" to="/mapa" class="nav-link admin-indicator">⚙ Admin</router-link>
    </div>
  </nav>
</template>

<script>
import { auth } from '../auth/auth.js'

export default {
  name: 'AppNavbar',
  computed: {
    isAdmin() {
      return auth.isAdmin()
    }
  }
}
</script>

<style scoped>
.navbar {
  background: #0a4f6e;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 12px rgba(0,0,0,.15);
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-family: Georgia, serif;
  font-size: 16px;
  font-weight: 400;
}
.brand-icon { font-size: 20px; }
.nav-links { display: flex; gap: 4px; align-items: center; }
.nav-link {
  color: rgba(255,255,255,.7);
  text-decoration: none;
  font-size: 14px;
  padding: 6px 14px;
  border-radius: 6px;
  transition: background .2s, color .2s;
}
.nav-link:hover { background: rgba(255,255,255,.1); color: white; }
.nav-link.active { background: rgba(255,255,255,.15); color: white; }
.admin-indicator { color: #7ee8c8; font-size: 13px; }
</style>
