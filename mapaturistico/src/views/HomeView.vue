<template>
  <div class="home">
    <AppNavbar />

    <section class="landing">
      <div class="landing-content">
        <span class="landing-tag">Santa Marta, Colombia</span>
        <h1>Descubre el <em>Caribe</em> colombiano</h1>
        <p>Zonas turísticas, playas, museos y restaurantes en un solo lugar.</p>
        <div class="landing-actions">
          <button class="btn-primary" @click="$router.push('/mapa')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>
            Ver Mapa
          </button>
          <button class="btn-secondary" @click="scrollToLugares">Explorar zonas</button>
        </div>
      </div>
      <div class="landing-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f8f6f1"/></svg>
      </div>
    </section>

    <section class="lugares" ref="lugaresSection">
      <div class="section-header">
        <h2>Zonas Turísticas</h2>
        <label class="toggle-precios">
          <input type="checkbox" v-model="mostrarPrecios" />
          <span>Mostrar precios</span>
        </label>
      </div>

      <div class="cards-grid">
        <div
          class="card"
          v-for="lugar in lugares"
          :key="lugar.id"
          @click="abrirLugar(lugar)"
        >
          <div class="card-badge" :class="lugar.seguridad">
            <span v-if="lugar.seguridad === 'seguro'">✅ Zona segura</span>
            <span v-else-if="lugar.seguridad === 'poco-seguro'">⚠️ Precaución</span>
            <span v-else>🚫 No recomendado</span>
          </div>
          <div class="card-tipo">{{ lugar.tipo }}</div>
          <h3>{{ lugar.nombre }}</h3>
          <p>{{ lugar.info }}</p>
          <div class="card-footer">
            <span v-show="mostrarPrecios" class="precio">{{ lugar.precio }}</span>
            <span v-if="!lugar.activo" class="no-disponible">No disponible</span>
            <span v-else class="ver-mas">Ver más →</span>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>© 2026 Mapa Turístico de Santa Marta</p>
      <router-link to="/login" class="admin-link">Admin</router-link>
    </footer>
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue';
import Navbar from '../components/AppNavbar.vue/index.js'
import { lugares } from '../data/lugares.js'

export default {
  name: "HomeView",
  components: { Navbar },
  data() {
    return {
      mostrarPrecios: true,
      lugares
    }
  },
  methods: {
    abrirLugar(lugar) {
      if (lugar.url) {
        window.open(lugar.url, "_blank")
      } else {
        this.$router.push({ name: 'lugar', params: { id: lugar.id } })
      }
    },
    scrollToLugares() {
      this.$refs.lugaresSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #f8f6f1;
  font-family: 'Georgia', serif;
}

.landing {
  background: linear-gradient(135deg, #0a4f6e 0%, #1a7a5e 60%, #0e6b8a 100%);
  padding: 5rem 2rem 0;
  position: relative;
  color: white;
  overflow: hidden;
}
.landing-content {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 4rem;
}
.landing-tag {
  display: inline-block;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 13px;
  letter-spacing: .08em;
  margin-bottom: 1.2rem;
}
.landing h1 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 400;
  line-height: 1.2;
  margin: 0 0 1rem;
}
.landing h1 em {
  font-style: italic;
  color: #7ee8c8;
}
.landing p {
  font-size: 1.1rem;
  opacity: .85;
  margin-bottom: 2rem;
}
.landing-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #7ee8c8;
  color: #0a4f6e;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform .2s, box-shadow .2s;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,.2); }
.btn-secondary {
  background: transparent;
  color: white;
  border: 1px solid rgba(255,255,255,.5);
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background .2s;
}
.btn-secondary:hover { background: rgba(255,255,255,.1); }
.landing-wave { line-height: 0; }
.landing-wave svg { width: 100%; height: 60px; display: block; }

.lugares {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.section-header h2 {
  font-size: 1.8rem;
  font-weight: 400;
  color: #0a4f6e;
  margin: 0;
}
.toggle-precios {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
}
.toggle-precios input { accent-color: #0a4f6e; }

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
.card {
  background: white;
  border-radius: 14px;
  padding: 1.4rem;
  cursor: pointer;
  border: 1px solid #e8e4dc;
  transition: transform .2s, box-shadow .2s;
}
.card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.1); }
.card-badge { font-size: 12px; margin-bottom: 10px; }
.card-tipo {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: #999;
  margin-bottom: 6px;
}
.card h3 { font-size: 1.15rem; margin: 0 0 6px; color: #1a1a1a; }
.card p { font-size: 14px; color: #666; margin: 0 0 1rem; line-height: 1.5; }
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}
.precio { color: #0a4f6e; font-weight: 600; }
.ver-mas { color: #1a7a5e; font-weight: 600; }
.no-disponible { color: #ccc; }

.footer {
  background: #0a4f6e;
  color: rgba(255,255,255,.7);
  text-align: center;
  padding: 1.5rem;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
.admin-link { color: rgba(255,255,255,.4); font-size: 12px; text-decoration: none; }
.admin-link:hover { color: rgba(255,255,255,.7); }
</style>
