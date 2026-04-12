<template>
  <div class='container'>
    <h2>Mapa</h2>
    <p v-if='loading'>Cargando...</p>
    <ul v-else>
      <li v-for='l in lugares' :key='l.id'>
        {{ l.nombre }} - {{ l.categoria }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getLugares } from '../store/lugares'

const lugares = ref([])
const loading = ref(true)

onMounted(async () => {
  lugares.value = await getLugares()
  loading.value = false
})
</script>
