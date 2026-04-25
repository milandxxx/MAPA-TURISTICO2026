<template>
  <div class='card'>
    <h3>{{ lugar.nombre }}</h3>
    <img v-if='lugar.imagen' :src='lugar.imagen'/>
    <p>{{ lugar.descripcion }}</p>
  </div>
</template>

<script>
export default { props:['lugar'] }
</script>

<style>
.card { background:white; padding:10px; border-radius:10px; }
</style>
