<template>
  <div class="about">
    <AppNavbar />
    <div class="about-content">
      <h1>Acerca del proyecto</h1>
      <p>Mapa Turístico de Santa Marta — Vue 3 + MapLibre GL · 2026</p>
    </div>
  </div>
</template>

<script>
import AppNavbar from '../components/Navbar.vue'
export default { name: 'AboutView', components: { AppNavbar } }
</script>

<style scoped>
.about { min-height: 100vh; background: #f8f6f1; font-family: Georgia, serif; }
.about-content { max-width: 600px; margin: 5rem auto; padding: 2rem; text-align: center; color: #0a4f6e; }
</style>
