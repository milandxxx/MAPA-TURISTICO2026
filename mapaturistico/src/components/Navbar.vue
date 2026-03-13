<template>
  <nav class="navbar">
    <router-link to="/" class="nav-link">Inicio</router-link>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar'   // cambia a multi-word y coincide con el import
}
</script>

<style scoped>
.navbar {
  background: #0072ff;
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ff9800;
}
</style>