<template>
  <div class="card">
    <h3>{{ lugar.nombre }}</h3>
    <p>{{ lugar.info }}</p>
    <div class="bottom">
      <span class="precio">💰 {{ lugar.precio }}</span>
      <span :class="lugar.activo ? 'activo' : 'inactivo'">
        {{ lugar.activo ? 'Disponible' : 'No disponible' }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps(['lugar'])
</script>

<style scoped>
.card { background:white;padding:20px;border-radius:15px; }
.precio{color:#2ecc71}
.activo{color:green}
.inactivo{color:red}
</style>
