<template>
  <div class='container'>
    <SearchBox @buscar='filtrar' />
    <p v-if='loading'>Cargando...</p>
    <div class='grid' v-if='!loading'>
      <CardLugar v-for='l in filtrados' :key='l.id' :lugar='l' />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getLugares } from '../store/lugares'
import SearchBox from '../components/SearchBox.vue'
import CardLugar from '../components/CardLugar.vue'

const lugares = ref([])
const filtro = ref('')
const loading = ref(true)

onMounted(async () => {
  lugares.value = await getLugares()
  loading.value = false
})

const filtrar = (text) => {
  filtro.value = text
}

const filtrados = computed(() =>
  lugares.value.filter(l =>
    l.nombre.toLowerCase().includes(filtro.value.toLowerCase())
  )
)
</script>
