<template>
  <div class="card" @click="$emit('click')">
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
.card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px;
  cursor: pointer;
  background: #fff;
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  text-align: left;
}
.card:hover {
  background: #f0f8ff;
  transform: translateY(-3px);
}
.card h3 {
  margin: 0;
  color: #007BFF;
}
.card p {
  margin-top: 8px;
  color: #555;
}
</style>
