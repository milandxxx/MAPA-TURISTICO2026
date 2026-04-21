<template>
  <div class="home">

    <div v-if="loading" class="loader">
      <div class="dot"></div>
      <p>Cargando...</p>
    </div>

    <div v-else>
      <h1>Mapa Turístico</h1>
      <p>Explora lugares desde el mapa</p>

      <router-link to="/map">
        <button>Ver Mapa</button>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return { loading: true }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1500)
  }
}
</script>

<style>
.home {
  text-align: center;
  margin-top: 80px;
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dot {
  width: 20px;
  height: 20px;
  background: black;
  border-radius: 50%;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0% { transform: translateY(0) }
  50% { transform: translateY(-15px) }
  100% { transform: translateY(0) }
}
</style>