<template>
<div>
<h1>Mapa Turístico</h1>
<SearchBox @buscar='buscar'/>
<div v-if='filtrados.length===0'>Sin resultados</div>
<div v-for='l in filtrados' :key='l.id'>{{l.nombre}}</div>
</div>
</template>

<script setup>
import { ref,computed,onMounted } from 'vue'
import { useLugares } from '../store/lugaresStore'
import SearchBox from '../components/SearchBox.vue'

const { lugares,cargar } = useLugares()
const texto = ref('')
onMounted(cargar)

const buscar = t => texto.value = t

const filtrados = computed(() =>
lugares.value.filter(l => l.nombre.toLowerCase().includes(texto.value.toLowerCase()))
)
</script>
