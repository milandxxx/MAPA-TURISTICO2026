<template>
  <div id='app'>
    <header class='navbar'>
      <h1>Mapa Turístico 2026</h1>

      <nav>
        <router-link to='/'>Inicio</router-link>
        <router-link to='/mapa'>Mapa</router-link>
        <router-link to='/login'>Login</router-link>
        <router-link to='/admin'>Admin</router-link>
      </nav>
    </header>

    <main class='content'>
      <router-view />
    </main>
  </div>
</template>

<script setup></script>

<style scoped>
.navbar {
  display:flex;
  justify-content:space-between;
  padding:15px;
  background:#1f2937;
  color:white;
}
nav a {
  color:white;
  margin-left:10px;
  text-decoration:none;
}
.content { padding:20px; }
</style>
