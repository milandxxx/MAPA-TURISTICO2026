<template>
  <div class="map-page">
    <Navbar />
    <div id="map" class="map-container"></div>
  </div>
</template>

<script>
import maplibregl from 'maplibre-gl'
import Navbar from '../components/Navbar.vue'
import { createApp } from 'vue'
import CardLugar from '../components/CardLugar.vue'

export default {
  name: 'MapView',
  components: { Navbar },
  data() {
    return {
      map: null,
      markers: [],
      lugaresLocales: [
        {
          id: 1,
          nombre: "Taganga",
          info: "Playa y pueblo pesquero famoso en Santa Marta.",
          img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Taganga_Bay.jpg",
          coords: [-74.215, 11.25],
          reseñas: []
        },
        {
          id: 2,
          nombre: "Playa Blanca",
          info: "Arena blanca y aguas cristalinas.",
          img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Playa_Blanca_Santa_Marta.jpg",
          coords: [-74.23, 11.20],
          reseñas: []
        }
      ]
    }
  },
  mounted() {
    this.map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-74.210, 11.243],
      zoom: 12
    })

    this.map.addControl(new maplibregl.NavigationControl(), 'top-right')
    this.map.on('load', () => this.renderMarkers())
  },
  methods: {
    renderMarkers() {
      this.markers.forEach(m => m.remove())
      this.markers = []

      this.lugaresLocales.forEach(lugar => {
        const el = document.createElement('div')
        el.className = 'marker'

        const popupNode = document.createElement('div')
        createApp(CardLugar, { lugar }).mount(popupNode)

        const popup = new maplibregl.Popup({ offset: 25 }).setDOMContent(popupNode)

        const marker = new maplibregl.Marker(el)
          .setLngLat(lugar.coords)
          .setPopup(popup)
          .addTo(this.map)

        this.markers.push(marker)
      })
    }
  }
}
</script>

<style scoped>
.map-page { display: flex; flex-direction: column; height: 100vh; }
.map-container { flex: 1; width: 100%; height: 100vh; }

.marker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #007AFF;
  border: 2px solid white;
  cursor: pointer;
}
</style>