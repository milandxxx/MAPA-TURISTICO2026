<template>
  <div class="map-container">

    <div class="top-bar">
      <input v-model="busqueda" placeholder="Buscar lugares" />
      <div class="results" v-if="busqueda">
        <div v-for="l in filtrados" :key="l.id" @click="irLugar(l)">
          {{ l.nombre }}
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="zoomIn">+</button>
      <button @click="zoomOut">-</button>
      <button @click="miUbicacion">o</button>
    </div>

    <div id="map" class="map"></div>

    <div class="card" v-if="seleccionado">
      <h3>{{ seleccionado.nombre }}</h3>
      <p>$ {{ seleccionado.precio }}</p>
      <span>{{ seleccionado.disponible ? 'Disponible' : 'No disponible' }}</span>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLugares } from '../store/lugaresStore'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'

const { lugares } = useLugares()

const busqueda = ref('')
const seleccionado = ref(null)

let map
let view

const filtrados = computed(() =>
  lugares.value.filter(l =>
    l.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)

onMounted(() => {
  const source = new VectorSource()

  lugares.value.forEach(l => {
    if (!l.lat || !l.lon) return

    source.addFeature(
      new Feature({
        geometry: new Point(fromLonLat([Number(l.lon), Number(l.lat)])),
        data: l
      })
    )
  })

  const layer = new VectorLayer({ source })

  view = new View({
    center: fromLonLat([-74.199, 11.266]),
    zoom: 12
  })

  map = new Map({
    target: 'map',
    layers: [
      new TileLayer({ source: new OSM() }),
      layer
    ],
    view
  })

  map.on('click', (e) => {
    map.forEachFeatureAtPixel(e.pixel, f => {
      seleccionado.value = f.get('data')
    })
  })

  if (!navigator.geolocation) return

  navigator.geolocation.getCurrentPosition(
    () => {},
    () => {}
  )
})

const irLugar = (l) => {
  if (!l.lat || !l.lon) return

  view.animate({
    center: fromLonLat([Number(l.lon), Number(l.lat)]),
    zoom: 15,
    duration: 800
  })

  seleccionado.value = l
  busqueda.value = ''
}

const zoomIn = () => view.setZoom(view.getZoom() + 1)
const zoomOut = () => view.setZoom(view.getZoom() - 1)

const miUbicacion = () => {
  if (!navigator.geolocation) return

  navigator.geolocation.getCurrentPosition(
    pos => {
      const coords = fromLonLat([
        pos.coords.longitude,
        pos.coords.latitude
      ])

      view.animate({
        center: coords,
        zoom: 14,
        duration: 1000
      })
    },
    () => {}
  )
}
</script>

<style>
.map-container {
  position: relative;
  height: 100vh;
}

.map {
  width: 100%;
  height: 100%;
}

.top-bar {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  z-index: 10;
}

.top-bar input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
}

.results {
  background: white;
  margin-top: 5px;
  border-radius: 10px;
  overflow: hidden;
}

.results div {
  padding: 10px;
  cursor: pointer;
}

.results div:hover {
  background: #f3f4f6;
}

.controls {
  position: absolute;
  right: 15px;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.controls button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.card {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  color: black;
  padding: 15px;
  border-radius: 10px;
  min-width: 200px;
}
</style>