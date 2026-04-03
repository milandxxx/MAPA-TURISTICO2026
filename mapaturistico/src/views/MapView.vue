<<<<<<< Updated upstream
<template>
  <div class="map-page">
    <Navbar @buscar="searchLocation" />
    <div id="map" class="map-container"></div>
    <div v-show="mostrarLista" class="lista-lugares">
      <ul>
        <li v-for="lugar in lugares" :key="lugar.nombre">
          <button @click="centrarLugar(lugar)">{{ lugar.nombre }}</button>
        </li>
      </ul>
    </div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer">✖</a>
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
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Style, Icon } from 'ol/style'
import Navbar from "../components/Navbar.vue"

export default {
  name: "MapView",
  components: { Navbar },
  data() {
    return {
      mapInstance: null,
      vectorLayer: null,
      mostrarLista: false,
      lugares: [
        {
          nombre: "El Rodadero",
          descripcion: "Playa urbana con ambiente turístico. Acceso libre.",
          precio: "Acceso libre. Carpas desde 20.000 COP. Acuario: 35.000 COP",
          seguridad: "Alta",
          coords: [-74.215, 11.209]
        },
        {
          nombre: "Minca",
          descripcion: "Montaña con cascadas y café.",
          precio: "Tour desde 50.000 COP",
          seguridad: "Media",
          coords: [-74.118, 11.146]
        },
        {
          nombre: "Parque Tayrona",
          descripcion: "Parque nacional con playas vírgenes.",
          precio: "Entrada desde 20.000 COP",
          seguridad: "Alta",
          coords: [-73.943, 11.3]
        }
      ]
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
        center: fromLonLat([-74.2, 11.24]),
        zoom: 12
      })
    })

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
  },
  methods: {
    centrarLugar(lugar) {
      const feature = new Feature({
        geometry: new Point(fromLonLat(lugar.coords)),
        nombre: lugar.nombre,
        descripcion: lugar.descripcion,
        precio: lugar.precio,
        seguridad: lugar.seguridad
      })
      feature.setStyle(new Style({
        image: new Icon({
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          scale: 0.05,
          anchor: [0.5, 1]
        })
      }))

      this.vectorLayer.getSource().clear()
      this.vectorLayer.getSource().addFeature(feature)

      this.mapInstance.getView().animate({
        center: fromLonLat(lugar.coords),
        zoom: 15,
        duration: 1000
      })
    },

    searchLocation(query) {
      if (!query) return
      const lugarLocal = this.lugares.find(l =>
        l.nombre.toLowerCase() === query.toLowerCase()
      )
      if (lugarLocal) {
        this.centrarLugar(lugarLocal)
      } else {
        alert(`"${query}" no está en el catálogo`)
      }
    }
  }
}
</script>

<style>
.map-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Roboto', Arial, sans-serif;
}

.map-container {
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
  background: #e5e5e5;
}
.lista-lugares {
  position: absolute;
  top: 60px;
  left: 10px;
  background: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  z-index: 1000;
}

.lista-lugares ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lista-lugares li {
  margin: 4px 0;
}

.lista-lugares button {
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
}

.lista-lugares button:hover {
  background: #1976d2;
  color: white;
}
.popup-card {
  display: flex;
  flex-direction: column;
  width: 280px;
  border-radius: 12px;
  overflow: hidden;
  font-family: 'Roboto', Arial, sans-serif;
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
  background: transparent;
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
  font-size: 18px;
  color: #666;
  transition: color 0.2s ease-in-out;
}

.ol-popup-closer:hover {
  color: #1976d2;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 600px) {
  .lista-lugares {
    top: 50px;
    left: 5px;
    padding: 6px;
  }
  .lista-lugares button {
    font-size: 12px;
    padding: 4px 8px;
  }
  .popup-card {
    width: 220px;
  }
}
</style>
=======
<script setup>
import { onMounted } from "vue"
import Map from "ol/Map"
import View from "ol/View"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"

onMounted(() => {
  new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: [-8360000, 1230000],
      zoom: 6
    })
  })
})
</script>

<template>
  <div>
    <h2>Mapa</h2>
    <div id="map" style="height:500px"></div>
  </div>
</template>
>>>>>>> Stashed changes
