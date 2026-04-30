<template>
  <div class="container">

    <!-- SIDEBAR -->
    <div class="sidebar" :class="{ open: sidebarOpen }">

      <SearchBox @buscar="buscarLugar" />

      <!-- SKELETON -->
      <div v-if="loading">
        <Skeleton height="2rem" class="mb-2" />
        <Skeleton height="2rem" class="mb-2" />
        <Skeleton height="2rem" />
      </div>

      <!-- LISTA -->
      <div v-else>

        <p v-if="filtrados.length === 0">Sin resultados</p>

        <div
          class="item"
          v-for="l in filtrados"
          :key="l.id"
          @click="seleccionarDesdeLista(l)"
        >
          <h4>{{ l.nombre }}</h4>
          <p>{{ l.descripcion }}</p>
        </div>

      </div>

    </div>

    <button class="toggle" @click="sidebarOpen = !sidebarOpen">
      ☰
    </button>

    <div id="map" class="map"></div>

    <!-- POPUP -->
    <div class="popup" v-show="seleccionado">

      <Skeleton v-if="loadingPopup" width="100%" height="150px" />

      <div v-else>
        <img :src="seleccionado?.imagen" class="img" />

        <h3>{{ seleccionado?.nombre }}</h3>
        <p>{{ seleccionado?.descripcion }}</p>

        <Button label="Ir" @click="trazarRuta" />
        <Button label="Cerrar" @click="cerrar" class="ml-2" />
      </div>

    </div>

  </div>
</template>

<script>
import SearchBox from '../components/SearchBox.vue'
import api from '../services/api'

import Skeleton from 'primevue/skeleton'
import Button from 'primevue/button'

// OpenLayers
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
import { Style, Stroke } from 'ol/style'

export default {
  components: { SearchBox, Skeleton, Button },

  data() {
    return {
      map: null,
      vector: null,
      lugares: [],
      filtrados: [],
      seleccionado: null,
      sidebarOpen: true,
      userCoords: null,
      loading: true,
      loadingPopup: false
    }
  },

  async mounted() {
    this.initMap()
    await this.cargar()
    this.filtrados = this.lugares
    this.getUserLocation()
    this.loading = false
  },

  methods: {

    initMap() {
      this.vector = new VectorSource()

      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({ source: new OSM() }),
          new VectorLayer({ source: this.vector })
        ],
        view: new View({
          center: fromLonLat([-74.1990, 11.2408]),
          zoom: 13
        })
      })

      this.map.on('click', evt => {
        this.map.forEachFeatureAtPixel(evt.pixel, f => {
          this.loadingPopup = true
          this.seleccionado = f.get('data')

          // Simular carga (PROMESA)
          setTimeout(() => {
            this.loadingPopup = false
          }, 800)
        })
      })
    },

    async cargar() {
      try {
        const res = await api.get('/lugares')
        this.lugares = res.data
        this.pintar(this.lugares)
      } catch (e) {
        console.error(e)
      }
    },

    pintar(lista) {
      this.vector.clear()

      lista.forEach(l => {
        if (!l.lat || !l.lng) return

        const f = new Feature({
          geometry: new Point(fromLonLat([l.lng, l.lat]))
        })

        f.set('data', l)
        this.vector.addFeature(f)
      })
    },

    buscarLugar(texto) {
      this.filtrados = this.lugares.filter(l =>
        l.nombre.toLowerCase().includes(texto.toLowerCase())
      )

      this.pintar(this.filtrados)

      if (this.filtrados.length) {
        const l = this.filtrados[0]

        this.map.getView().animate({
          center: fromLonLat([l.lng, l.lat]),
          zoom: 15
        })
      }
    },

    seleccionarDesdeLista(l) {
      this.seleccionado = l

      this.map.getView().animate({
        center: fromLonLat([l.lng, l.lat]),
        zoom: 15
      })
    },

    getUserLocation() {
      navigator.geolocation.getCurrentPosition(pos => {
        this.userCoords = [
          pos.coords.longitude,
          pos.coords.latitude
        ]
      })
    },

    trazarRuta() {
      if (!this.userCoords || !this.seleccionado) return

      const coords = [
        fromLonLat(this.userCoords),
        fromLonLat([this.seleccionado.lng, this.seleccionado.lat])
      ]

      const line = new Feature({
        geometry: new LineString(coords)
      })

      line.setStyle(new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 3
        })
      }))

      this.vector.addFeature(line)
    },

    cerrar() {
      this.seleccionado = null
    }
  }
}
</script>