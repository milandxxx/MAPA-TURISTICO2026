<template>
  <div class="card">
    <h3>{{ lugar.nombre }}</h3>
    <p class="tipo">{{ lugar.tipo }}</p>
    <p class="desc">{{ lugar.descripcion }}</p>

    <p v-if="lugar.activo" class="activo">✅ Disponible para visitar</p>
    <p v-else class="no-activo">❌ No disponible actualmente</p>

    <router-link
      v-show="lugar.activo"
      :to="{ name: 'lugar', params: { id: lugar.id } }"
      class="btn-ver"
    >
      Ver más
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CardLugar',
  props: {
    lugar: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.btn-ver {
  display: inline-block;
  background: #ff9800;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
}
.btn-ver:hover {
  background: #e68900;
  transform: scale(1.05);
}
</style>