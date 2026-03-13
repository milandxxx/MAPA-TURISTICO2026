<template>
  <section class="detalle">
    <h2>{{ lugar.nombre }}</h2>
    <img :src="lugar.img" :alt="lugar.nombre" class="imagen"/>
    <p><strong>Tipo:</strong> {{ lugar.tipo }}</p>
    <p><strong>Descripción:</strong> {{ lugar.info }}</p>
    <p><strong>Reseña:</strong> {{ lugar.reseña }}</p>
    <router-link to="/" class="btn-volver">Volver</router-link>
  </section>
</template>

<script>
export default {
  name: 'LugarView',
  props: ['id'],
  data() {
    return {
      lugar: {}
    }
  },
  created() {
    const id = this.$route.params.id
    // Dataset definido dentro del componente
    const lugaresData = [
      { id: 1, nombre: "Parque de los Novios", tipo: "Zona", info: "Espacio público en el centro histórico.", img: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Parque_de_los_Novios_Santa_Marta.jpg", reseña: "Lugar ideal para disfrutar la vida nocturna." },
      { id: 2, nombre: "Hotel Zuana Beach Resort", tipo: "Hotel", info: "Resort frente al mar con piscinas y spa.", img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Zuana_Beach_Resort.jpg", reseña: "Uno de los hoteles más completos de Santa Marta." },
      { id: 3, nombre: "Taganga", tipo: "Zona", info: "Bahía pintoresca ideal para buceo.", img: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Taganga_Bay.jpg", reseña: "Perfecta para mochileros y buceo." }
    ]
    this.lugar = lugaresData.find(l => l.id == id)
  }
}
</script>

<style scoped>
.detalle {
  padding: 2rem;
  text-align: center;
}
.imagen {
  max-width: 500px;
  border-radius: 12px;
  margin: 1rem 0;
}
.btn-volver {
  display: inline-block;
  background: #0072ff;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease;
}
.btn-volver:hover {
  background: #2a5298;
}
</style>