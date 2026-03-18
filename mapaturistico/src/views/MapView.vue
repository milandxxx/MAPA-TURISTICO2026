<template>
  <div class="map-page">
    <Navbar />
    <div id="map" class="map-container"></div>
    <SearchBox :map="mapInstance" />
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
      autoPanAnimation: { duration: 150 }
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

        // Card con toda la info del lugar
        content.innerHTML = `
          <div class="popup-card">
            <div class="popup-info">
              <h3>${feature.get('nombre') || ''}</h3>
              ${feature.get('descripcion') ? `<p>${feature.get('descripcion')}</p>` : ''}
              ${feature.get('precio') ? `<p><strong>Precio:</strong> ${feature.get('precio')}</p>` : ''}
              ${feature.get('seguridad') ? `<p><strong>Seguridad:</strong> ${feature.get('seguridad')}</p>` : ''}
            </div>
          </div>
        `
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
  height: 100vh;
}

.map-container {
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
  background: #e5e5e5;
}

/* Card estilo Google Maps */
.popup-card {
  display: flex;
  flex-direction: column;
  width: 280px;
  border-radius: 12px;
  overflow: hidden;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  background: #fff;
  animation: fadeIn 0.2s ease-in-out;
}

.popup-info {
  padding: 12px;
}

.popup-info h3 {
  margin: 0 0 8px;
  font-size: 18px;
  color: #202124;
}

.popup-info p {
  margin: 4px 0;
  font-size: 14px;
  color: #555;
}

.ol-popup {
  position: absolute;
  border: none;
  bottom: 12px;
  left: -50px;
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>