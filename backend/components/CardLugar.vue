<template>
  <div class="card">
    <h3>{{ lugar.nombre }}</h3>
    <p>{{ lugar.descripcion }}</p>
  </div>
</template>

<script>
export default {
  name:"CardLugar",
  props:["lugar"]
}
</script>

<style>
.card { border:1px solid #ccc; padding:10px; margin:10px; cursor:pointer; background:#fff; border-radius:6px; transition:0.3s; }
.card:hover { background:#f0f0f0; transform:scale(1.02); }
</style>
