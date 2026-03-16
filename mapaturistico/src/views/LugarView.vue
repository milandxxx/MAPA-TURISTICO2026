<template>
  <div class="lugar-page" v-if="lugar">
    <Navbar />
    <div class="lugar-hero" :style="lugar.img ? `background-image: url(${lugar.img})` : ''">
      <div class="hero-overlay">
        <div class="hero-content">
          <span class="lugar-tipo">{{ lugar.tipo }}</span>
          <h1>{{ lugar.nombre }}</h1>
          <div class="seguridad-badge" :class="lugar.seguridad">
            <span v-if="lugar.seguridad === 'seguro'">✅ Zona segura</span>
            <span v-else-if="lugar.seguridad === 'poco-seguro'">⚠️ Visitar con precaución</span>
            <span v-else>🚫 No recomendado para turistas</span>
          </div>
        </div>
      </div>
    </div>

    <div class="lugar-body">
      <div class="lugar-info">
        <div class="info-card">
          <h3>Descripción</h3>
          <p>{{ lugar.descripcion }}</p>
        </div>
        <div class="info-card resena">
          <h3>Reseña</h3>
          <p>{{ lugar.reseña }}</p>
        </div>
        <div class="info-meta">
          <div class="meta-item">
            <span class="meta-label">Precio estimado</span>
            <span class="meta-value">{{ lugar.precio }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Disponibilidad</span>
            <span class="meta-value" :class="lugar.activo ? 'activo' : 'inactivo'">
              {{ lugar.activo ? 'Disponible' : 'No disponible actualmente' }}
            </span>
          </div>
        </div>
      </div>

      <div class="lugar-actions">
        <button class="btn-mapa" @click="$router.push('/mapa')">
          Ver en el mapa
        </button>
        <router-link to="/" class="btn-volver">← Volver a inicio</router-link>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <Navbar />
    <div class="not-found-content">
      <h2>Lugar no encontrado</h2>
      <p>El lugar que buscas no existe o fue eliminado.</p>
      <router-link to="/" class="btn-volver">← Volver a inicio</router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { getLugarById } from '../data/lugares.js'

export default {
  name: 'LugarView',
  components: { Navbar },
  props: ['id'],
  computed: {
    lugar() {
      return getLugarById(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
.lugar-page { min-height: 100vh; background: #f8f6f1; font-family: Georgia, serif; }

.lugar-hero {
  height: 360px;
  background-color: #0a4f6e;
  background-size: cover;
  background-position: center;
  position: relative;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,30,50,.85) 0%, rgba(10,30,50,.3) 100%);
  display: flex;
  align-items: flex-end;
}
.hero-content {
  padding: 2rem;
  color: white;
}
.lugar-tipo {
  display: inline-block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .12em;
  background: rgba(255,255,255,.15);
  border-radius: 20px;
  padding: 3px 12px;
  margin-bottom: 10px;
}
.hero-content h1 {
  font-size: clamp(1.6rem, 4vw, 2.5rem);
  font-weight: 400;
  margin: 0 0 10px;
}
.seguridad-badge {
  display: inline-block;
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(255,255,255,.15);
}

.lugar-body { max-width: 760px; margin: 0 auto; padding: 2.5rem 1.5rem; }

.info-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e8e4dc;
}
.info-card h3 {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: #999;
  margin: 0 0 10px;
}
.info-card p { font-size: 15px; color: #444; line-height: 1.7; margin: 0; }
.resena p { font-style: italic; color: #666; }

.info-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}
.meta-item {
  background: white;
  border-radius: 10px;
  padding: 1rem 1.2rem;
  border: 1px solid #e8e4dc;
}
.meta-label {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: #999;
  margin-bottom: 4px;
}
.meta-value { font-size: 15px; font-weight: 600; color: #0a4f6e; }
.activo { color: #1a7a5e !important; }
.inactivo { color: #cc3333 !important; }

.lugar-actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.btn-mapa {
  background: #0a4f6e;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background .2s;
}
.btn-mapa:hover { background: #0d6b94; }
.btn-volver {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color .2s;
}
.btn-volver:hover { color: #0a4f6e; }

.not-found { min-height: 100vh; background: #f8f6f1; }
.not-found-content {
  max-width: 500px;
  margin: 5rem auto;
  text-align: center;
  padding: 2rem;
}
.not-found-content h2 { color: #0a4f6e; }
.not-found-content p { color: #666; margin-bottom: 1.5rem; }
</style>
