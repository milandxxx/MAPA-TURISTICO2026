<template>
<<<<<<< Updated upstream
  <div class="map-container">

    <SearchBox @buscar="buscarLugar" />

    <div id="map" class="map"></div>

    <!-- CARD GOOGLE MAPS -->
    <div v-if="selectedLugar" class="overlay">

      <div class="card">

        <button class="close" @click="selectedLugar=null">✖</button>

        <img :src="selectedLugar.imagen" class="img"/>

        <h2>{{ selectedLugar.nombre }}</h2>
        <p>{{ selectedLugar.descripcion }}</p>

        <div class="actions">
          <button @click="trazarRuta">🧭 Cómo llegar</button>
        </div>

        <!-- COMENTARIOS -->
        <div class="comments">
          <h3>Reseñas</h3>

          <textarea v-model="comentario" placeholder="Escribe tu reseña"></textarea>
          <button @click="guardarComentario">Enviar</button>

          <ul>
            <li v-for="(c,i) in comentarios" :key="i">{{ c }}</li>
          </ul>
        </div>

      </div>
    </div>

=======
  <div class="container">
    <div class="sidebar" :class="{ open: sidebarOpen }">
      <SearchBox @buscar="buscarLugar" />
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
    <button class="toggle" @click="sidebarOpen = !sidebarOpen">
      ☰
    </button>
    <div id="map" class="map"></div>
    <div class="popup" v-show="seleccionado">
      <img :src="seleccionado?.imagen" class="img" />
      <h3>{{ seleccionado?.nombre }}</h3>
      <p>{{ seleccionado?.descripcion }}</p>
      <button @click="trazarRuta">Ir</button>
      <button @click="cerrar">Cerrar</button>
    </div>
>>>>>>> Stashed changes
  </div>
</template>
<script>
<<<<<<< Updated upstream
import api from "../services/api";
import SearchBox from "../components/SearchBox.vue";

import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Icon, Stroke } from "ol/style";
import { Select } from "ol/interaction";

export default {
  components: { SearchBox },

  data() {
    return {
      map: null,
      vectorLayer: null,
      routeLayer: null,
      selectedLugar: null,
      comentario: "",
      comentarios: []
    };
  },

  mounted() {
    this.initMap();
    this.cargarLugares();
  },

  methods: {
    initMap() {
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({ source: new OSM() })
        ],
        view: new View({
          center: fromLonLat([-74.2, 11.24]),
          zoom: 12
        })
      });

      setTimeout(() => this.map.updateSize(), 300);
    },

    async cargarLugares() {
      const res = await api.get("/lugares");
      this.renderMarkers(res.data);
    },

    async buscarLugar(query) {
      const res = await api.get(`/lugares?nombre=${query}`);
      this.renderMarkers(res.data);
    },

    renderMarkers(lugares) {
      if (this.vectorLayer) this.map.removeLayer(this.vectorLayer);

      const features = lugares.map(l => new Feature({
        geometry: new Point(fromLonLat([l.lon, l.lat])),
        data: l
      }));

      this.vectorLayer = new VectorLayer({
        source: new VectorSource({ features }),
        style: new Style({
          image: new Icon({
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            scale: 0.05
          })
        })
      });

      this.map.addLayer(this.vectorLayer);

      const select = new Select();
      this.map.addInteraction(select);

      select.on("select", e => {
        if (e.selected.length) {
          this.selectedLugar = e.selected[0].get("data");
          this.comentarios = [];
        }
      });
    },

    trazarRuta() {
      if (!this.selectedLugar) return;

      if (this.routeLayer) this.map.removeLayer(this.routeLayer);

      const origen = fromLonLat([-74.2, 11.24]);
      const destino = fromLonLat([this.selectedLugar.lon, this.selectedLugar.lat]);

      const route = new Feature({
        geometry: new LineString([origen, destino])
      });

      this.routeLayer = new VectorLayer({
        source: new VectorSource({ features: [route] }),
        style: new Style({
          stroke: new Stroke({
            color: "#007bff",
            width: 4
          })
        })
      });

      this.map.addLayer(this.routeLayer);
    },

    guardarComentario() {
      if (this.comentario.trim()) {
        this.comentarios.push(this.comentario);
        this.comentario = "";
      }
=======
import SearchBox from '../components/SearchBox.vue'
import api from '../services/api'

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
  components: { SearchBox },
  data() {
    return {
      map: null,
      vector: null,
      lugares: [],
      filtrados: [],
      seleccionado: null,
      sidebarOpen: true,
      userCoords: null
    }
  },
  async mounted() {
    this.initMap()
    await this.cargar()
    this.filtrados = this.lugares
    this.getUserLocation()
  },
  methods: {
    initMap() {
      this.vector = new VectorSource()
      const layer = new VectorLayer({
        source: this.vector
      })
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({ source: new OSM() }),
          layer
        ],
        view: new View({
          center: fromLonLat([-74.1990, 11.2408]), // Santa Marta
          zoom: 13
        })
      })
      this.map.on('click', evt => {
        this.map.forEachFeatureAtPixel(evt.pixel, f => {
          this.seleccionado = f.get('data')
        })
      })
    },
    async cargar() {
      const res = await api.get('/lugares')
      this.lugares = res.data
      this.pintar(this.lugares)
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
      if (this.filtrados.length > 0) {
        const l = this.filtrados[0]
        this.map.getView().animate({
          center: fromLonLat([l.lng, l.lat]),
          zoom: 15,
          duration: 800
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
>>>>>>> Stashed changes
    }
  }
};
</script>
<<<<<<< Updated upstream

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
}

/* OVERLAY */
.overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

/* CARD */
.card {
  width: 400px;
  max-height: 80vh;
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 0 -5px 20px rgba(0,0,0,0.3);
  animation: slideUp 0.3s ease;
}

.img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
}

.close {
  position: absolute;
  right: 20px;
  top: 10px;
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
}

.actions {
  margin: 10px 0;
}

.actions button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.comments textarea {
  width: 100%;
  margin-top: 10px;
}

.comments button {
  margin-top: 5px;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
=======
<style scoped>
.container {
  display: flex;
}
.sidebar {
  width: 300px;
  background: white;
  height: 100vh;
  overflow: auto;
  transform: translateX(-100%);
  transition: 0.3s;
  position: absolute;
  z-index: 10;
}
.sidebar.open {
  transform: translateX(0);
}
.item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}
.item:hover {
  background: #f0f0f0;
}
.toggle {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 20;
}
.map {
  width: 100%;
  height: 100vh;
}
.popup {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 250px;
  background: white;
  padding: 15px;
  border-radius: 10px;
}
.img {
  width: 100%;
  border-radius: 8px;
>>>>>>> Stashed changes
}
</style>