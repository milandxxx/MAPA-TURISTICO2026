<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/map">Mapa</router-link>
    <router-link to="/admin">Admin</router-link>
  </nav>

  <router-view />
</template>

<script setup>
// vacío pero obligatorio completo
</script>

<style>
nav {
  display: flex;
  gap: 20px;
  padding: 10px;
  background: #333;
}

a {
  color: white;
  text-decoration: none;
}
</style>