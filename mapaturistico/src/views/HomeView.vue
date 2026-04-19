<template>
  <input v-model="search" @input="loadData" placeholder="Buscar..." />

  <div class="grid">
    <div v-for="l in lugares" :key="l.id" class="card">
      {{ l.nombre }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useLugares from '../composables/useLugares'

const { lugares, load } = useLugares()
const search = ref('')

onMounted(loadData)

function loadData() {
  load({ search: search.value })
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
.card {
  padding: 10px;
  border: 1px solid #ccc;
}
</style>