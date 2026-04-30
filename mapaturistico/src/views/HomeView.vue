<template>
  <div class="home">

    <div class="hero">

      <h1 class="title">Mapa Turístico</h1>

      <!-- ICONO ANIMADO -->
      <div class="map-animation">
        📍
      </div>

      <div class="buttons">
        <Button label="Explorar Mapa" @click="$router.push('/mapa')" />
      </div>

    </div>

  </div>
</template>

<script>
import Button from 'primevue/button'

export default {
  components: { Button }
}
</script>

<style scoped>

.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
}

.hero {
  text-align: center;
  color: white;
}

/* TITULO */
.title {
  font-size: 40px;
  margin-bottom: 20px;
  animation: fadeUp 1s ease;
}

/* ANIMACIÓN MARCADOR */
.map-animation {
  font-size: 50px;
  animation: movePin 3s infinite ease-in-out;
}

@keyframes movePin {
  0% { transform: translateX(-80px) rotate(-10deg); }
  50% { transform: translateX(80px) rotate(10deg); }
  100% { transform: translateX(-80px) rotate(-10deg); }
}

.buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

</style>