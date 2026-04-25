<template>
  <div>
    <div v-if="loading" class="loader">
      <div class="route">
        <div class="line"></div>
        <div class="icon">🧭</div>
      </div>
      <p>Cargando destinos en Bogotá...</p>
    </div>

    <div v-else class="home" :style="backgroundStyle">
      <div class="overlay">
        <div class="content">
          <h1>🌆 Mapa Turístico Bogotá</h1>
          <p>{{ mensaje }}</p>

          <div class="buttons">
            <button class="primary" @click="$router.push('/map')">
              🗺️ Ir al Mapa Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      hora: new Date().getHours(),
      loading: true
    }
  },
  computed: {
    backgroundStyle() {
      let url = ""
      if (this.hora >= 6 && this.hora < 12) {
        url = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
      } else if (this.hora >= 12 && this.hora < 18) {
        url = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
      } else if (this.hora >= 18 && this.hora < 20) {
        url = "https://images.unsplash.com/photo-1493558103817-58b2924bce98"
      } else {
        url = "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
      }
      return { backgroundImage: `url(${url})` }
    },
    mensaje() {
      if (this.hora >= 6 && this.hora < 12) return "Buenos días ☀️"
      if (this.hora >= 12 && this.hora < 18) return "Buenas tardes 🌆"
      if (this.hora >= 18 && this.hora < 20) return "Atardecer en la ciudad 🌇"
      return "Explora Bogotá de noche 🌙"
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 2500)

    setInterval(() => {
      this.hora = new Date().getHours()
    }, 60000)
  }
}
</script>

<style>
.loader {
  height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.loader p {
  margin-top: 20px;
  font-size: 1.2rem;
  opacity: 0.85;
}

.route {
  width: 300px;
  height: 4px;
  background: rgba(255,255,255,0.2);
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.line {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, #42b983, transparent);
  animation: moveLine 1.5s infinite;
}

.icon {
  position: absolute;
  top: -20px;
  font-size: 1.5rem;
  animation: moveIcon 2.5s linear infinite;
}

@keyframes moveLine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes moveIcon {
  0% { left: 0; }
  100% { left: 100%; }
}

.home {
  height: 100vh;
  width: 100%;
  background-position: center;
  background-size: cover;
  transition: background-image 1s ease-in-out;
}

.overlay {
  background: rgba(0, 0, 0, 0.55);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  text-align: center;
  color: white;
  animation: fadeIn 1s ease;
}

.content h1 {
  font-size: 3rem;
}

.content p {
  margin: 15px 0;
  font-size: 1.2rem;
}

.buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.primary {
  background: linear-gradient(135deg, #42b983, #2ecc71);
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  transition: 0.3s;
}

.primary:hover {
  transform: scale(1.08);
}

.secondary {
  background: transparent;
  border: 2px solid white;
  padding: 12px 22px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.secondary:hover {
  background: white;
  color: black;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>