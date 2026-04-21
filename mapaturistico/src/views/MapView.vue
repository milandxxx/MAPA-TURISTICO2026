<template>
  <div>

    <div v-if="loading" class="map-loader">
      <div class="map-bg"></div>
      <div class="pin"></div>
      <p>Buscando...</p>
    </div>

    <div class="search">
      <input v-model="search" @keydown.enter="buscar" placeholder="Buscar lugar..." />
      <button @click="buscar">Buscar</button>
    </div>

    <div id="map" class="map"></div>

    <div v-if="selected" class="card">
      <h3>{{ selected.nombre }}</h3>
      <p>{{ selected.desc }}</p>
      <button @click="crearRuta">Ir</button>
      <button @click="selected=null">X</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import LineString from 'ol/geom/LineString'
import { fromLonLat } from 'ol/proj'

export default {
  data() {
    return {
      map: null,
      source: new VectorSource(),
      routeSource: new VectorSource(),
      selected: null,
      userCoords: null,
      search: '',
      loading: false
    }
  },

  methods: {
    async buscar() {
      if (!this.search) return

      this.loading = true

      try {
        const res = await axios.get('http://127.0.0.1:8000/lugares', {
          params: { search: this.search }
        })

        // NO QUITAR: evita duplicar puntos
        this.source.clear()

        res.data.forEach(l => {
          this.source.addFeature(
            new Feature({
              geometry: new Point(fromLonLat([l.lng, l.lat])),
              data: l
            })
          )
        })

      } catch (e) {
        console.log('error')
      }

      this.loading = false
    },

    getUser() {
      // NO QUITAR: necesario para rutas
      navigator.geolocation.getCurrentPosition(pos => {
        this.userCoords = [pos.coords.longitude, pos.coords.latitude]
      })
    },

    async crearRuta() {
      if (!this.userCoords || !this.selected) return

      const [lng1, lat1] = this.userCoords
      const [lng2, lat2] = [this.selected.lng, this.selected.lat]

      const url = `https://router.project-osrm.org/route/v1/driving/${lng1},${lat1};${lng2},${lat2}?overview=full&geometries=geojson`

      const res = await axios.get(url)

      const coords = res.data.routes[0].geometry.coordinates

      const line = new LineString(coords.map(c => fromLonLat(c)))

      // NO QUITAR: limpia rutas anteriores
      this.routeSource.clear()

      this.routeSource.addFeature(new Feature({ geometry: line }))
    },

    initMap() {
      const vectorLayer = new VectorLayer({ source: this.source })
      const routeLayer = new VectorLayer({ source: this.routeSource })

      // NO CAMBIAR ID
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({ source: new OSM() }),
          vectorLayer,
          routeLayer
        ],
        view: new View({
          center: fromLonLat([-74.2, 11.2]),
          zoom: 12
        })
      })

      // NO QUITAR: click en marcador
      this.map.on('singleclick', (evt) => {
        this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
          const data = feature.get('data')
          if (data) this.selected = data
        })
      })
    }
  },

  mounted() {
    this.initMap()
    this.getUser()
  }
}
</script>

<style>
.map {
  width: 100%;
  height: 100vh;
}

.search {
  position: fixed;
  top: 10px;
  left: 10px;
  background: white;
  padding: 5px;
  z-index: 2;
}

.map-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.map-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(#ccc 1px, transparent 1px),
    linear-gradient(90deg, #ccc 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.2;
}

.pin {
  width: 15px;
  height: 15px;
  background: red;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.card {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 10px;
  border: 1px solid gray;
}
</style>