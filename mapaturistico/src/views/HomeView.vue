<template>
  <div>
    <h1>Explora Santa Marta</h1>
    <SearchBox @buscar="filtrar" />
    <CardLugar v-for="l in filtrados" :key="l.nombre" :lugar="l"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import lugares from '../data/lugares'
import CardLugar from '../components/CardLugar.vue'
import SearchBox from '../components/SearchBox.vue'

const filtrados = ref(lugares)
const filtrar = txt => {
  filtrados.value = lugares.filter(l => l.nombre.toLowerCase().includes(txt.toLowerCase()))
}
</script>
