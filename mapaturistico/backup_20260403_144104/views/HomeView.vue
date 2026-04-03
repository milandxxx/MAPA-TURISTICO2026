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

<script>
import { lugares } from '../data/lugares'
import CardLugar from '../components/CardLugar.vue'
import SearchBox from '../components/SearchBox.vue'

export default {
  components: { CardLugar, SearchBox },
  data() {
    return {
      busqueda: ''
    }
  },
  computed: {
    filtrados() {
      return lugares.filter(l =>
        l.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      )
    }
  },
  methods: {
    filtrar(texto) {
      this.busqueda = texto
    }
  }
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
