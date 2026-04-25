<template>
  <div class="home">
    <h1>🌍 Mapa Turístico 2026</h1>
    <SearchBox @buscar="filtrar" />
    <div v-if="loading">
      <Skeleton width="100%" height="150px" v-for="n in 3" :key="n" class="mb-2"/>
    </div>
    <div v-if="lugares.length === 0 && !loading" class="empty">No hay lugares disponibles</div>
    <div v-show="filtrados.length > 0" class="grid">
      <CardLugar v-for="l in filtrados" :key="l.id" :lugar="l" @click="verLugar(l)" />
    </div>
  </div>
</template>

<script>
import CardLugar from "../components/CardLugar.vue"
import SearchBox from "../components/SearchBox.vue"
import api from "../services/api"
import Skeleton from "primevue/skeleton"

export default {
  name: "HomeView",
  components: { CardLugar, SearchBox, Skeleton },
  data() {
    return { lugares: [], filtrados: [], loading: true }
  },
  created() {
    api.get("/lugares")
      .then(res => {
        this.lugares = res.data
        this.filtrados = res.data
      })
      .catch(err => console.error(err))
      .finally(() => { this.loading = false })
  },
  methods: {
    filtrar(query) {
      this.filtrados = this.lugares.filter(l => l.nombre.toLowerCase().includes(query.toLowerCase()))
    },
    verLugar(lugar) {
      alert(`Has seleccionado: ${lugar.nombre}`)
    }
  }
}
</script>

<style>
.home { padding:20px; text-align:center; }
.grid { display:flex; flex-wrap:wrap; gap:20px; justify-content:center; }
.mb-2 { margin-bottom:10px; }
.empty { color:#888; font-style:italic; margin-top:20px; }
</style>
