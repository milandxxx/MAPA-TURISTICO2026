<template>
  <div class="home">
    <h1>Mapa Turístico</h1>
    <button @click="$router.push('/map')">Entrar</button>
  </div>
</template>

<script>
export default { name:"HomeView" }
</script>

<style>
.home { height:100vh; display:flex; justify-content:center; align-items:center; flex-direction:column; }
</style>
