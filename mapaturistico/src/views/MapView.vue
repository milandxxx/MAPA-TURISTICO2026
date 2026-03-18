<template>
  <div class="map-page">
    <Navbar />
    <!-- Contenedor del mapa -->
    <div id="map" class="map-container"></div>
    <!-- Buscador flotante -->
    <SearchBox :map="mapInstance" />
    <!-- Popup estilo Google Maps -->
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
  </div>
</template>

<script>
import { Map, View, Overlay } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Navbar from "../components/Navbar.vue"
import SearchBox from "../components/SearchBox.vue"

export default {
  name: "MapView",
  components: { Navbar, SearchBox },
  data() {
    return {
      mapInstance: null,
      vectorLayer: null
    }
  },
  mounted() {
    this.vectorLayer = new VectorLayer({ source: new VectorSource() })

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({ source: new OSM() }),
        this.vectorLayer
      ],
      view: new View({
        center: fromLonLat([-74.2, 11.24]), // Santa Marta
        zoom: 12
      })
    })

    // Popup estilo Google Maps
    const container = document.getElementById('popup')
    const content = document.getElementById('popup-content')
    const closer = document.getElementById('popup-closer')

    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: { duration: 250 }
    })
    map.addOverlay(overlay)

    closer.onclick = function() {
      overlay.setPosition(undefined)
      closer.blur()
      return false
    }

    map.on('click', (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, f => f)
      if (feature) {
        const coords = feature.getGeometry().getCoordinates()
        overlay.setPosition(coords)
        content.innerHTML = `<strong>${feature.get('nombre')}</strong>`
      } else {
        overlay.setPosition(undefined)
      }
    })

    this.mapInstance = map
  }
}
</script>

<style>
.map-page {
  display: flex;
  flex-direction: column;
  height: 100vh; /* toda la ventana */
}

.map-container {
  flex: 1;
  width: 100%;
  height: 100%; /* ocupa todo el espacio disponible */
  position: relative;
  background: #e5e5e5; /* color de fondo mientras carga */
}

.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #ccc;
  bottom: 12px;
  left: -50px;
  min-width: 200px;
}

.ol-popup strong {
  font-size: 16px;
  color: #202124;
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;s
}
</style>