<template>
  <div class="search-box">
    <input
      v-model="query"
      @keyup.enter="searchLocation"
      placeholder="Buscar lugar..."
    />
    <button @click="searchLocation">Buscar</button>
  </div>
</template>

<script>
import { fromLonLat } from 'ol/proj'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Style, Icon } from 'ol/style'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

export default {
  name: "SearchBox",
  props: {
    map: { type: Object, required: true }
  },
  data() {
    return { query: "" }
  },
  methods: {
    async searchLocation() {
      if (!this.query) return
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.query + ', Santa Marta')}`
      const res = await fetch(url)
      const data = await res.json()
      if (data.length > 0) {
        const lon = parseFloat(data[0].lon)
        const lat = parseFloat(data[0].lat)
        const feature = new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          nombre: this.query
        })
        feature.setStyle(new Style({
          image: new Icon({
            src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            scale: 0.05,
            anchor: [0.5, 1]
          })
        }))
        let vectorLayer = this.map.getLayers().item(1)
        if (!vectorLayer) {
          vectorLayer = new VectorLayer({ source: new VectorSource() })
          this.map.addLayer(vectorLayer)
        }
        vectorLayer.getSource().clear()
        vectorLayer.getSource().addFeature(feature)
        this.map.getView().setCenter(fromLonLat([lon, lat]))
        this.map.getView().setZoom(15)
      } else {
        alert("No se encontró la ubicación")
      }
    }
  }
}
</script>

<style>
.search-box {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 6px 10px;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  display: flex;
  gap: 6px;
  z-index: 1000; /* asegura que quede encima del mapa */
}

.search-box input {
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 200px;
}

.search-box button {
  padding: 6px 12px;
  background: #0078d7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-box button:hover {
  background: #005fa3;
}
</style>