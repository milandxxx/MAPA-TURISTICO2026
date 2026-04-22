<template>
  <div class='card'>
    <img :src='lugar.imagen' />
    <h3>{{ lugar.nombre }}</h3>
    <p>{{ lugar.descripcion }}</p>
    <button @click='\(\"fav\", lugar.id)'>⭐</button>
  </div>
</template>

<script setup>
defineProps(['lugar'])
</script>
