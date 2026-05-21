<template>
  <div class="map-page">
    <div class="search-box">
      <input
        v-model="busqueda"
        @keyup.enter="buscarLugar"
        placeholder="Buscar lugar turístico..."
      />

      <button @click="buscarLugar">
        Buscar
      </button>
    </div>

    <div id="map" class="map"></div>
  </div>
</template>

<script>
import "ol/ol.css";

import Map from "ol/Map";
import View from "ol/View";

import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";

import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";

import { fromLonLat } from "ol/proj";

import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

import axios from "axios";

export default {
  name: "MapView",

  data() {
    return {
      map: null,
      vectorSource: null,
      busqueda: ""
    };
  },

  mounted() {
    this.vectorSource = new VectorSource();

    const vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    this.map = new Map({
      target: "map",

      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],

      view: new View({
        center: fromLonLat([-74.19904, 11.24079]),
        zoom: 13
      })
    });

    setTimeout(() => {
      this.map.updateSize();
    }, 500);
  },

  methods: {
    async buscarLugar() {
      this.vectorSource.clear();

      if (!this.busqueda.trim()) {
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/lugares/buscar/${this.busqueda}`
        );

        const lugares = response.data;

        lugares.forEach((lugar) => {
          const marker = new Feature({
            geometry: new Point(
              fromLonLat([
                parseFloat(lugar.longitud),
                parseFloat(lugar.latitud)
              ])
            ),
            nombre: lugar.nombre
          });

          marker.setStyle(
            new Style({
              image: new Icon({
                src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                scale: 0.06
              })
            })
          );

          this.vectorSource.addFeature(marker);
        });

        if (lugares.length > 0) {
          this.map.getView().animate({
            center: fromLonLat([
              parseFloat(lugares[0].longitud),
              parseFloat(lugares[0].latitud)
            ]),
            zoom: 15,
            duration: 1000
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.map-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.search-box {
  padding: 15px;
  background: white;
  display: flex;
  gap: 10px;
  z-index: 1000;
}

.search-box input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
}

.search-box button {
  padding: 10px 20px;
  cursor: pointer;
}

.map {
  width: 100%;
  height: calc(100vh - 70px);
}
</style>