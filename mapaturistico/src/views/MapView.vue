<template>
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

  </div>
</template>

<script>
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
    }
  }
};
</script>

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
}
</style>