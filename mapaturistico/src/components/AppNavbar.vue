<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/">Inicio</router-link>
      <router-link to="/mapa">Mapa</router-link>
    </div>
    <div class="nav-center">
      <input 
        v-model="query" 
        @keyup.enter="$emit('buscar', query)" 
        placeholder="Buscar lugar..." 
      />
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return { query: "" }
  }
}
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1976d2;
  color: white;
  padding: 8px 16px;
  font-family: 'Roboto', Arial, sans-serif;
}

.nav-left a {
  margin-right: 12px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease-in-out;
}

.nav-left a:hover {
  text-decoration: underline;
  color: #bbdefb;
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-center input {
  border-radius: 16px;
  border: none;
  padding: 6px 12px;
  min-width: 250px;
  text-align: center;
  background: #fff;
  color: #555;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: box-shadow 0.2s ease-in-out;
}

.nav-center input:focus {
  outline: none;
  box-shadow: 0 0 6px rgba(25,118,210,0.6);
}
@media (max-width: 600px) {
  .nav-center input {
    min-width: 180px;
    font-size: 12px;
  }
  .nav-left a {
    margin-right: 8px;
    font-size: 12px;
  }
}
</style>