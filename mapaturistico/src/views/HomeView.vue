<template>
  <div class="home">
    <section class="hero">
      <h1>Mapa Turístico</h1>
      <button @click="$router.push('/mapa')">Explorar</button>
    </section>

    <SearchBox @buscar="filtrar" />

    <div class="grid">
      <CardLugar v-for="l in filtrados" :key="l.id" :lugar="l" />
    </div>

    <button @click="$router.push('/login')">Admin</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLugares } from '../store/lugaresStore'
import CardLugar from '../components/CardLugar.vue'
import SearchBox from '../components/SearchBox.vue'

const { lugares } = useLugares()
const texto = ref('')

const filtrados = computed(() =>
  lugares.value.filter(l =>
    l.nombre.toLowerCase().includes(texto.value.toLowerCase())
  )
)

const filtrar = (t) => texto.value = t
</script>

<style>
.hero {
  text-align: center;
  padding: 40px;
}

.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
}
</style>