<template>
  <div class='home'>
    <h1>Mapa Turístico 2026</h1>

    <SearchBox @buscar='filtrar' />

    <p v-if='filtrados.length === 0'>No se encontraron resultados</p>

    <div class='grid'>
      <CardLugar v-for='l in filtrados' :key='l.id' :lugar='l' />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { lugares } from '../data/lugares'
import CardLugar from '../components/CardLugar.vue'
import SearchBox from '../components/SearchBox.vue'

const busqueda = ref('')

const filtrados = computed(() =>
  lugares.filter(l =>
    l.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)

function filtrar(t) {
  busqueda.value = t
}
</script>

<style scoped>
.home { padding:20px; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
  gap: 20px;
}
</style>
