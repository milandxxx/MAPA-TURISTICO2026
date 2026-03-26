<template>
  <div class="map-page">

    <h1>Mapa Turístico</h1>

    <SearchBox @buscar="buscarLugar" />

    <div ref="mapContainer" class="map"></div>

    <div ref="popupRef" class="popup" v-show="popupVisible">
      <strong>{{ lugarSeleccionado?.nombre }}</strong>
      <p>{{ lugarSeleccionado?.tipo }}</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import SearchBox from '../components/SearchBox.vue'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'

import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'

import Overlay from 'ol/Overlay'

const mapContainer = ref(null)
const popupRef = ref(null)

const popupVisible = ref(false)
const lugarSeleccionado = ref(null)

let map = null
let vectorSource = null
let overlay = null

/*
  Función para obtener datos reales desde OpenStreetMap usando Overpass API
*/
const cargarLugares = async () => {

  /*
    Consulta Overpass:
    - Busca lugares turísticos cerca de Santa Marta
  */
  const query = `
    [out:json];
    node
      ["tourism"]
      (11.1,-74.3,11.3,-74.1);
    out;
  `

  const response = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      body: query
    }
  )

  const data = await response.json()

  /*
    Convertir datos a features (marcadores)
  */
  const features = data.elements.map(el => {

    const feature = new Feature({
      geometry: new Point(fromLonLat([el.lon, el.lat])),
      data: {
        nombre: el.tags?.name || "Sin nombre",
        tipo: el.tags?.tourism || "Lugar turístico"
      }
    })

    return feature
  })

  vectorSource.clear()
  vectorSource.addFeatures(features)
}

onMounted(async () => {
  await nextTick()

  vectorSource = new VectorSource()

  const vectorLayer = new VectorLayer({
    source: vectorSource
  })

  map = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({ source: new OSM() }),
      vectorLayer
    ],
    view: new View({
      center: fromLonLat([-74.2, 11.2]),
      zoom: 12
    })
  })

  overlay = new Overlay({
    element: popupRef.value,
    positioning: 'bottom-center'
  })

  map.addOverlay(overlay)

  /*
    Evento click en marcador
  */
  map.on('singleclick', (evt) => {
    const feature = map.forEachFeatureAtPixel(evt.pixel, f => f)

    if (feature) {
      lugarSeleccionado.value = feature.get('data')
      popupVisible.value = true
      overlay.setPosition(evt.coordinate)
    } else {
      popupVisible.value = false
    }
  })

  /*
    Cargar datos reales
  */
  await cargarLugares()
})

/*
  Buscar dentro de los marcadores cargados
*/
const buscarLugar = (texto) => {
  const features = vectorSource.getFeatures()

  const encontrado = features.find(f =>
    f.get('data').nombre.toLowerCase().includes(texto.toLowerCase())
  )

  if (!encontrado) {
    alert('Lugar no encontrado')
    return
  }

  const coord = encontrado.getGeometry().getCoordinates()

  map.getView().animate({
    center: coord,
    zoom: 15,
    duration: 1000
  })
}
</script>

<style scoped>
.map-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.map {
  flex: 1;
}

.popup {
  background: white;
  padding: 10px;
  border-radius: 8px;
  position: absolute;
  transform: translate(-50%, -100%);
}
</style>