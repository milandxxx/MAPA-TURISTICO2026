<template>
  <div id="map" class="map-container"></div>

  <!-- Panel de administración solo visible si el admin está logeado -->
  <div v-if="isAdmin" class="admin-panel">
    <h3>Panel de administración</h3>
    <form @submit.prevent="agregarLugar">
      <input v-model="nuevoLugar.nombre" placeholder="Nombre" required />
      <input v-model="nuevoLugar.info" placeholder="Info" required />
      <input v-model="nuevoLugar.img" placeholder="URL Imagen" required />
      <input v-model.number="nuevoLugar.lng" placeholder="Longitud" required />
      <input v-model.number="nuevoLugar.lat" placeholder="Latitud" required />
      <button type="submit">Agregar lugar</button>
    </form>
  </div>
</template>

<script>
import maplibregl from 'maplibre-gl'

export default {
  name: 'MapView',
  data() {
    return {
      isAdmin: localStorage.getItem('isAdmin') === 'true',
      map: null,
      lugares: [
        { nombre: "Centro Histórico", coords: [-74.210, 11.243], info: "Arquitectura colonial y vida nocturna.", img: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Santa_Marta_Centro_Historico.jpg", reseña: "Un lugar lleno de historia y cultura.", seguro: true },
        { nombre: "El Rodadero", coords: [-74.225, 11.207], info: "Playas populares y hoteles familiares.", img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Rodadero_Santa_Marta.jpg", reseña: "La playa más visitada de Santa Marta.", seguro: true },
        { nombre: "Restaurante Ouzo", coords: [-74.210, 11.243], info: "Comida mediterránea en el centro histórico.", img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Ouzo_Santa_Marta.jpg", reseña: "Muy recomendado por locales y turistas.", seguro: true }
      ],
      nuevoLugar: { nombre: '', info: '', img: '', lng: null, lat: null }
    }
  },
  mounted() {
    this.map = new maplibregl.Map({
      container: 'map',
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [-74.210, 11.243],
      zoom: 11
    })

    this.renderMarkers()
  },
  methods: {
    renderMarkers() {
      this.lugares.forEach(lugar => {
        const markerColor = lugar.seguro ? '#0072ff' : lugar.pocoSeguro ? '#ff3b3b' : '#888'
        const el = document.createElement('div')
        el.className = 'marker'
        el.style.backgroundColor = markerColor

        new maplibregl.Marker(el)
          .setLngLat(lugar.coords)
          .setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(`
              <div class="popup">
                <h3>${lugar.nombre}</h3>
                <img src="${lugar.img}" alt="${lugar.nombre}" />
                <p>${lugar.info}</p>
                <small>${lugar.reseña || ''}</small>
              </div>
            `)
          )
          .addTo(this.map)
      })
    },
    agregarLugar() {
      const nuevo = {
        nombre: this.nuevoLugar.nombre,
        coords: [this.nuevoLugar.lng, this.nuevoLugar.lat],
        info: this.nuevoLugar.info,
        img: this.nuevoLugar.img,
        reseña: "Agregado por admin",
        seguro: true
      }
      this.lugares.push(nuevo)
      this.renderMarkers()
      this.nuevoLugar = { nombre: '', info: '', img: '', lng: null, lat: null }
      alert('Lugar agregado correctamente')
    }
  }
}
</script>

<style scoped>
.map-container { width: 100%; height: 100vh; }
.marker {
  width: 18px; height: 18px; border-radius: 50%;
  border: 2px solid white; cursor: pointer;
}
.maplibregl-popup-content {
  font-family: Arial, sans-serif; text-align: center; max-width: 250px;
}
.maplibregl-popup-content img {
  width: 100%; border-radius: 8px; margin-bottom: 0.5rem;
}
.admin-panel {
  position: absolute; top: 10px; right: 10px;
  background: white; padding: 1rem; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.admin-panel input {
  display: block; margin: 0.3rem 0; padding: 0.5rem;
  width: 200px; border: 1px solid #ccc; border-radius: 6px;
}
.admin-panel button {
  margin-top: 0.5rem; padding: 0.5rem 1rem;
  background: #0072ff; color: white; border: none;
  border-radius: 6px; cursor: pointer;
}
.admin-panel button:hover { background: #0056b3; }
</style>