<template>
  <div class="card" @click="fav" @dblclick="ver">
    <img :src="lugar.imagen" />
    <h3>{{ lugar.nombre }}</h3>
    <p>{{ lugar.descripcion }}</p>
    <span>${{ lugar.precio }}</span>
  </div>
</template>

<script setup>
import { toggleFav } from '../store/favoritos'

const props = defineProps(['lugar'])

const fav = async () => {
  await toggleFav(props.lugar.id)
}

const ver = () => {
  alert(props.lugar.nombre)
}
</script>

<style scoped>
.card {
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>