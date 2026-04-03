<<<<<<< Updated upstream
<template>
  <div class="card-lugar">
    <img :src="lugar.img" alt="foto" class="imagen" @error="hideImg"/>
    <h3>{{ lugar.nombre }}</h3>
    <p>{{ lugar.info }}</p>

    <div class="reseñas">
      <h4>Reseñas</h4>
      <div v-if="lugar.reseñas && lugar.reseñas.length">
        <div v-for="(r, i) in lugar.reseñas" :key="i">
          ⭐ {{ r.rating }} - {{ r.comentario }}
        </div>
      </div>
      <div v-else>
        <em>Sin reseñas aún</em>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardLugar",
  props: { lugar: Object },
  methods: {
    hideImg(e) { e.target.style.display = 'none' }
  }
}
</script>

<style scoped>
.card-lugar {
  width: 260px;
  font-family: Roboto, Arial, sans-serif;
}
.imagen {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}
h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 6px 0;
}
p {
  font-size: 13px;
  color: #555;
}
.reseñas {
  font-size: 12px;
  margin-top: 6px;
}
</style>
=======
<script setup>
import { defineProps } from "vue"

const props = defineProps({
  lugar: Object
})
</script>

<template>
  <div>
    <h3>{{ props.lugar.nombre }}</h3>

    <p>${{ props.lugar.precio }}</p>

    <p v-if="props.lugar.disponible">Disponible</p>
    <p v-show="!props.lugar.disponible">No disponible</p>

    <button @click="alert(props.lugar.nombre)">Ver</button>
  </div>
</template>
>>>>>>> Stashed changes
