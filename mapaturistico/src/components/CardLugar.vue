<template>
  <div class='card'>
    <img :src='lugar.imagen'/>
    <h3>{{ lugar.nombre }}</h3>
    <p>{{ lugar.descripcion }}</p>
    <span>{{ lugar.precio }}</span>
    <span>? {{ lugar.rating }}</span>
    <button @click='fav'>{{ esFavorito ? '??':'??' }}</button>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { getFavoritos,toggleFavorito } from '../store/favoritos'

const props = defineProps(['lugar'])
const esFavorito = ref(false)

onMounted(async ()=>{
  const favs = await getFavoritos()
  esFavorito.value = favs.some(f=>f.lugar_id===props.lugar.id)
})

const fav = async ()=>{
  await toggleFavorito(props.lugar.id)
  esFavorito.value = !esFavorito.value
}
</script>
