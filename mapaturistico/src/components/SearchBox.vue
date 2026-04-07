<template>
  <div class="search">
    <input v-model="texto" placeholder="Buscar" />
    <button @click="emit('buscar', texto)">Buscar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const texto = ref('')
const emit = defineEmits(['buscar'])
</script>

<style>
.search {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}
</style>