<template>
  <div class="container">

    <!-- SIDEBAR -->
    <div class="sidebar">
      <input v-model="search" @input="filtrar" placeholder="Buscar..." />

      <div
        v-for="l in filtrados"
        :key="l.id"
        class="item"
        @click="seleccionarDestino(l)"
      >
        {{ l.nombre }}
      </div>

      <button @click="usarUbicacion">Mi ubicación</button>
      <button @click="calcularRuta">Calcular ruta</button>
    </div>

    <!-- MAPA -->
    <div id="map" class="map"></div>

    <!-- CARD -->
    <div v-if="seleccionado" class="card">
      <h3>{{ seleccionado.nombre }}</h3>
      <p>{{ seleccionado.descripcion }}</p>
      <span>${{ seleccionado.precio }}</span>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import useLugares from '../composables/useLugares'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import LineString from 'ol/geom/LineString'
import { fromLonLat } from 'ol/proj'

import axios from 'axios'

// 🔹 STATE
const { lugares, load } = useLugares()

const filtrados = ref([])
const seleccionado = ref(null)

const origen = ref(null)
const destino = ref(null)

const search = ref('')

// 🔹 MAP
let map
let source = new VectorSource()
let layer = new VectorLayer({ source })

// 🔥 RENDER MARCADORES (CLAVE)
const renderMarkers = () => {
  source.clear()

  filtrados.value.forEach(l => {
    const marker = new Feature({
      geometry: new Point(fromLonLat([l.lng, l.lat])),
      data: l
    })

    source.addFeature(marker)
  })
}

// 🔹 FILTRO
const filtrar = () => {
  filtrados.value = lugares.value.filter(l =>
    l.nombre.toLowerCase().includes(search.value.toLowerCase())
  )
}

// 🔹 SELECCION
const seleccionarDestino = (l) => {
  seleccionado.value = l
  destino.value = [l.lng, l.lat]
}

// 🔹 GEOLOCALIZACIÓN
const usarUbicacion = () => {
  navigator.geolocation.getCurrentPosition(pos => {
    origen.value = [pos.coords.longitude, pos.coords.latitude]
  })
}

// 🔹 RUTA
const calcularRuta = async () => {
  if (!origen.value || !destino.value) return

  const res = await axios.get(
    `http://router.project-osrm.org/route/v1/driving/${origen.value[0]},${origen.value[1]};${destino.value[0]},${destino.value[1]}?overview=full&geometries=geojson`
  )

  const coords = res.data.routes[0].geometry.coordinates

  const line = new Feature({
    geometry: new LineString(coords.map(c => fromLonLat(c)))
  })

  source.addFeature(line)
}

// 🔹 INIT
onMounted(async () => {
  await load()
  filtrados.value = lugares.value

  map = new Map({
    target: 'map',
    layers: [
      new TileLayer({ source: new OSM() }),
      layer
    ],
    view: new View({
      center: fromLonLat([-74.2, 11.24]),
      zoom: 13
    })
  })

  renderMarkers()

  // CLICK EN MARCADOR
  map.on('click', e => {
    map.forEachFeatureAtPixel(e.pixel, f => {
      const data = f.get('data')
      if (data) {
        seleccionado.value = data
        destino.value = [data.lng, data.lat]
      }
    })
  })
})

// 🔥 REACTIVIDAD AUTOMÁTICA
watch(filtrados, () => {
  renderMarkers()
})
</script>

<style scoped>
.container {
  display: flex;
}

.sidebar {
  width: 260px;
  background: #fff;
  padding: 10px;
  height: 100vh;
  overflow-y: auto;
}

.item {
  padding: 6px;
  cursor: pointer;
}

.item:hover {
  background: #eee;
}

.map {
  width: 100%;
  height: 100vh;
}

.card {
  position: absolute;
  bottom: 20px;
  left: 280px;
  background: white;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}
</style>