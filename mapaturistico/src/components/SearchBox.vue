<template>
  <div class="search-box">
    <input
      v-model="query"
      @keyup.enter="searchLocation"
      placeholder="Buscar lugar..."
    />
    <button @click="searchLocation">🔍</button>

    <!-- Lista de lugares con v-for -->
    <div v-show="mostrarLista" class="lista-lugares">
      <ul>
        <li v-for="lugar in lugares" :key="lugar.nombre">
          <button @click="centrarLugar(lugar)">{{ lugar.nombre }}</button>
        </li>
      </ul>
    </div>
    <button @click="mostrarLista = !mostrarLista">
      {{ mostrarLista ? 'Ocultar' : 'Mostrar' }} lugares
    </button>
  </div>
</template>

<script>
import { fromLonLat } from 'ol/proj'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Style, Icon } from 'ol/style'

export default {
  name: "SearchBox",
  props: { map: { type: Object, required: true }, lugares: { type: Array, required: true } },
  data() { return { query: "", mostrarLista: false } },
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

      let vectorLayer = this.map.getLayers().item(1)
      vectorLayer.getSource().clear()
      vectorLayer.getSource().addFeature(feature)

      this.map.getView().animate({
        center: fromLonLat(lugar.coords),
        zoom: 15,
        duration: 1000
      })
    },

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
          nombre: this.query,
          descripcion: "Lugar buscado en OSM",
          precio: "Consultar",
          seguridad: "Consultar"
        })
        feature.setStyle(new Style({
          image: new Icon({
            src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            scale: 0.05,
            anchor: [0.5, 1]
          })
        }))

        let vectorLayer = this.map.getLayers().item(1)
        vectorLayer.getSource().clear()
        vectorLayer.getSource().addFeature(feature)

        this.map.getView().animate({
          center: fromLonLat([lon, lat]),
          zoom: 15,
          duration: 1000
        })
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
  padding: 8px 12px;
  border-radius: 24px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1000;
}

.search-box input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  min-width: 200px;
}

.search-box button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.lista-lugares {
  margin-top: 8px;
}

.lista-lugares ul {
  list-style: none;
  padding: 0;
}

.lista-lugares li {
  margin: 4px 0;
}
</style>