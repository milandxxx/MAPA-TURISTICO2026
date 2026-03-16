<template>
  <div class="map-page">
    <Navbar />
    <div id="map" class="map-container"></div>

    <div v-if="isAdmin" class="admin-panel">
      <h3>Panel de administración</h3>
      <form @submit.prevent="agregarLugar">
        <input v-model="nuevoLugar.nombre" placeholder="Nombre" required />
        <input v-model="nuevoLugar.info" placeholder="Descripción" required />
        <input v-model="nuevoLugar.img" placeholder="URL Imagen" required />
        <input v-model.number="nuevoLugar.lng" placeholder="Longitud (ej: -74.210)" type="number" step="any" required />
        <input v-model.number="nuevoLugar.lat" placeholder="Latitud (ej: 11.243)" type="number" step="any" required />
        <button type="submit">Agregar lugar</button>
      </form>
      <button class="btn-logout" @click="cerrarSesion">Cerrar sesión</button>
    </div>
  </div>
</template>

<script>
import maplibregl from 'maplibre-gl'
import Navbar from '../components/Navbar.vue'
import { lugares } from '../data/lugares.js'
import { auth } from '../auth/auth.js'

export default {
  name: 'MapView',
  components: { Navbar },
  data() {
    return {
      isAdmin: auth.isAdmin(),
      map: null,
      // Copia local para poder agregar lugares temporales sin mutar la fuente de datos
      lugaresLocales: [...lugares],
      nuevoLugar: { nombre: '', info: '', img: '', lng: null, lat: null }
    }
  },
  mounted() {
    this.map = new maplibregl.Map({
      container: 'map',
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [-74.210, 11.243],
      zoom: 12
    })

    this.map.addControl(new maplibregl.NavigationControl(), 'top-right')
    this.map.on('load', () => this.renderMarkers())
  },
  methods: {
    colorPorSeguridad(seguridad) {
      if (seguridad === 'seguro') return '#1a7a5e'
      if (seguridad === 'poco-seguro') return '#e07b00'
      return '#cc3333'
    },
    renderMarkers() {
      this.lugaresLocales.forEach(lugar => {
        const el = document.createElement('div')
        el.className = 'marker'
        el.style.backgroundColor = this.colorPorSeguridad(lugar.seguridad)

        new maplibregl.Marker(el)
          .setLngLat(lugar.coords)
          .setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(`
              <div class="popup-inner">
                <img src="${lugar.img}" alt="${lugar.nombre}" onerror="this.style.display='none'" />
                <strong>${lugar.nombre}</strong>
                <span class="popup-tipo">${lugar.tipo || ''}</span>
                <p>${lugar.info}</p>
                <small>${lugar.reseña || ''}</small>
                <a href="/#/lugar/${lugar.id}" class="popup-link">Ver detalles →</a>
              </div>
            `)
          )
          .addTo(this.map)
      })
    },
    agregarLugar() {
      const nuevo = {
        id: Date.now(),
        nombre: this.nuevoLugar.nombre,
        tipo: 'Lugar',
        coords: [this.nuevoLugar.lng, this.nuevoLugar.lat],
        info: this.nuevoLugar.info,
        img: this.nuevoLugar.img,
        reseña: "Agregado por administrador",
        seguridad: 'seguro',
        activo: true
      }
      this.lugaresLocales.push(nuevo)
      this.renderMarkers()
      this.nuevoLugar = { nombre: '', info: '', img: '', lng: null, lat: null }
      alert(`Lugar "${nuevo.nombre}" agregado al mapa.`)
    },
    cerrarSesion() {
      auth.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.map-page { display: flex; flex-direction: column; height: 100vh; }
.map-container { flex: 1; width: 100%; }

.marker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2.5px solid white;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,.3);
  transition: transform .15s;
}
.marker:hover { transform: scale(1.3); }

.admin-panel {
  position: absolute;
  top: 72px;
  right: 16px;
  background: white;
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0,0,0,.15);
  min-width: 240px;
  z-index: 10;
}
.admin-panel h3 {
  margin: 0 0 12px;
  font-size: 15px;
  color: #0a4f6e;
}
.admin-panel input {
  display: block;
  margin: 6px 0;
  padding: 8px 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
}
.admin-panel button[type="submit"] {
  margin-top: 8px;
  padding: 8px 16px;
  width: 100%;
  background: #0a4f6e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background .2s;
}
.admin-panel button[type="submit"]:hover { background: #0d6b94; }
.btn-logout {
  margin-top: 8px;
  padding: 6px 16px;
  width: 100%;
  background: transparent;
  color: #cc3333;
  border: 1px solid #cc3333;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: background .2s;
}
.btn-logout:hover { background: #fff0f0; }
</style>

<style>
/* Estilos globales para el popup de maplibre */
.popup-inner {
  font-family: Georgia, serif;
  max-width: 220px;
  text-align: left;
}
.popup-inner img {
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 8px;
}
.popup-inner strong {
  display: block;
  font-size: 14px;
  color: #0a4f6e;
  margin-bottom: 2px;
}
.popup-tipo {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: #999;
  margin-bottom: 4px;
}
.popup-inner p {
  font-size: 12px;
  color: #555;
  margin: 4px 0;
  line-height: 1.4;
}
.popup-inner small {
  font-size: 11px;
  color: #888;
  font-style: italic;
}
.popup-link {
  display: inline-block;
  margin-top: 8px;
  font-size: 12px;
  color: #1a7a5e;
  font-weight: 600;
  text-decoration: none;
}
</style>
