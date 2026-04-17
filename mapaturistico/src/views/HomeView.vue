<template>
<div class='container'>
<SearchBox @buscar='filtrar'/>
<p v-if='store.loading'>Cargando...</p>
<transition-group name='list' tag='div' class='grid'>
<CardLugar v-for='l in filtrados' :key='l.id' :lugar='l'/>
</transition-group>
</div>
</template>

<script setup>
import { ref,computed,onMounted } from 'vue'
import { useLugaresStore } from '../store/useLugares'
import SearchBox from '../components/SearchBox.vue'
import CardLugar from '../components/CardLugar.vue'

const store = useLugaresStore()
const filtro = ref('')

onMounted(()=>store.fetchLugares())

const filtrar = t=>filtro.value=t

const filtrados = computed(()=>store.lugares.filter(l=>l.nombre.toLowerCase().includes(filtro.value.toLowerCase())))
</script>
