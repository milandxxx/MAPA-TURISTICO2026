<template>
  <div v-if="lugar.activo" class="card">

    <img :src="lugar.imagen" />

    <h3>{{ lugar.nombre }}</h3>
    <p>{{ lugar.info }}</p>
    <span>${{ lugar.precio }}</span>

    <BaseButton @click="$emit('verMapa', lugar)">
      Ver en mapa
    </BaseButton>

  </div>
</template>

<script setup>
import BaseButton from './BaseButton.vue'

defineProps(['lugar'])
defineEmits(['verMapa'])
</script>

<style scoped>
.card {
  background: white;
  border-radius: 10px;
  padding: 10px;
}
img {
  width: 100%;
}
</style>