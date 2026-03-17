<template>
  <div class="map-page">
    <Navbar />
    <div id="map" class="map-container"></div>
    <div id="popup" class="ol-popup"></div>
  </div>
</template>

<script>
import 'ol/ol.css'
import Navbar from "../components/Navbar.vue"
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Cluster from 'ol/source/Cluster'
import { Icon, Style, Text, Fill, Stroke } from 'ol/style'
import Overlay from 'ol/Overlay'

export default {
  name: "MapView",
  components: { Navbar },
  mounted() {
    // Lugares (15 ejemplos)
    const lugares = [
      { nombre:"Taganga", tipo:"Zona turística", info:"Playa y pueblo pesquero.", img:"/img/taganga.jpg", coords:[-74.215,11.25], seguridad:"Media", reseñas:[{rating:5,comentario:"Hermoso para bucear"}]},
      { nombre:"Playa Blanca", tipo:"Zona turística", info:"Arena blanca y aguas cristalinas.", img:"/img/playablanca.jpg", coords:[-74.23,11.20], seguridad:"Alta", reseñas:[{rating:5,comentario:"El agua es espectacular"}]},
      { nombre:"Centro Histórico", tipo:"Zona turística", info:"Arquitectura colonial y museos.", img:"/img/centro.jpg", coords:[-74.198,11.241], seguridad:"Alta", reseñas:[{rating:4,comentario:"Bonito para caminar"}]},
      { nombre:"El Rodadero", tipo:"Zona turística", info:"Playa popular con hoteles.", img:"/img/rodadero.jpg", coords:[-74.215,11.21], seguridad:"Media", reseñas:[{rating:4,comentario:"Muy concurrido"}]},
      { nombre:"Parque Tayrona", tipo:"Zona turística", info:"Parque natural con playas vírgenes.", img:"/img/tayrona.jpg", coords:[-74.05,11.3], seguridad:"Alta", reseñas:[{rating:5,comentario:"Increíble naturaleza"}]},
      { nombre:"Restaurante La Marina", tipo:"Restaurante", info:"Comida típica costeña.", img:"/img/lamarina.jpg", coords:[-74.2,11.24], seguridad:"Alta", precio:"$20.000 COP", reseñas:[{rating:5,comentario:"Excelente pescado"}]},
      { nombre:"Restaurante El Pescaito", tipo:"Restaurante", info:"Especialidad en mariscos.", img:"/img/pescaito.jpg", coords:[-74.22,11.26], seguridad:"Media", precio:"$25.000 COP", reseñas:[{rating:4,comentario:"Buen ceviche"}]},
      { nombre:"Hotel Económico Caribe", tipo:"Hotel", info:"Hotel sencillo cerca del centro.", img:"/img/hotelcaribe.jpg", coords:[-74.199,11.242], seguridad:"Alta", precio:"$60.000 COP/noche", reseñas:[{rating:4,comentario:"Cómodo y barato"}]},
      { nombre:"Hostal Taganga", tipo:"Hotel", info:"Hostal económico frente al mar.", img:"/img/hostaltaganga.jpg", coords:[-74.216,11.251], seguridad:"Media", precio:"$40.000 COP/noche", reseñas:[{rating:5,comentario:"Vista espectacular"}]},
      { nombre:"Restaurante Mi Ranchito", tipo:"Restaurante", info:"Comida casera y económica.", img:"/img/miranchito.jpg", coords:[-74.21,11.245], seguridad:"Alta", precio:"$15.000 COP", reseñas:[{rating:4,comentario:"Muy hogareño"}]},
      { nombre:"Hotel Playa Bonita", tipo:"Hotel", info:"Hotel económico en Playa Blanca.", img:"/img/playabonita.jpg", coords:[-74.231,11.201], seguridad:"Alta", precio:"$70.000 COP/noche", reseñas:[{rating:4,comentario:"Buen servicio"}]},
      { nombre:"Restaurante El Centro", tipo:"Restaurante", info:"Menús ejecutivos económicos.", img:"/img/elcentro.jpg", coords:[-74.197,11.241], seguridad:"Alta", precio:"$12.000 COP", reseñas:[{rating:3,comentario:"Rápido y barato"}]},
      { nombre:"Hotel Rodadero Express", tipo:"Hotel", info:"Hotel económico en El Rodadero.", img:"/img/rodaderoexpress.jpg", coords:[-74.214,11.212], seguridad:"Media", precio:"$65.000 COP/noche", reseñas:[{rating:4,comentario:"Cerca de la playa"}]},
      { nombre:"Restaurante Tayrona Verde", tipo:"Restaurante", info:"Comida saludable y vegetariana.", img:"/img/tayronaverde.jpg", coords:[-74.06,11.31], seguridad:"Alta", precio:"$18.000 COP", reseñas:[{rating:5,comentario:"Muy fresco"}]},
      { nombre:"Hotel Bonda Económico", tipo:"Hotel", info:"Hotel sencillo en Bonda.", img:"/img/bonda.jpg", coords:[-74.15,11.28], seguridad:"Media", precio:"$50.000 COP/noche", reseñas:[{rating:3,comentario:"Básico pero cómodo"}]}
    ]

    // Crear features
    const features = lugares.map(lugar => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(lugar.coords)),
        lugar
      })
      feature.setStyle(new Style({
        image: new Icon({
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          scale: 0.05
        })
      }))
      return feature
    })

    // Clustering
    const clusterSource = new Cluster({
      distance: 40,
      source: new VectorSource({ features })
    })

    const clusterLayer = new VectorLayer({
      source: clusterSource,
      style: feature => {
        const size = feature.get('features').length
        if (size > 1) {
          return new Style({
            image: new Icon({
              src: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
              scale: 0.05
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({ color: '#fff' }),
              stroke: new Stroke({ color: '#000', width: 2 })
            })
          })
        } else {
          return feature.get('features')[0].getStyle()
        }
      }
    })

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({ source: new OSM() }),
        clusterLayer
      ],
      view: new View({
        center: fromLonLat([-74.210, 11.243]),
        zoom: 12
      })
    })

    // Popup
    const popup = document.getElementById('popup')
    const overlay = new Overlay({ element: popup, autoPan: true, autoPanAnimation: { duration: 250 } })
    map.addOverlay(overlay)

    map.on('singleclick', evt => {
      map.forEachFeatureAtPixel(evt.pixel, feature => {
        const clusterFeatures = feature.get('features')
        if (clusterFeatures.length === 1) {
          const lugar = clusterFeatures[0].get('lugar')
          popup.innerHTML = `
            <div class="card-lugar">
              <img src="${lugar.img}" class="imagen"/>
              <h3>${lugar.nombre}</h3>
              <p><strong>${lugar.tipo}</strong> - ${lugar.info}</p>
              <p><strong>Seguridad:</strong> ${lugar.seguridad}</p>
              ${lugar.precio ? `<p><strong>Precio:</strong> ${lugar.precio}</p>` : ""}
              <div class="reseñas">
                <strong>Reseñas:</strong><br/>
                ${lugar.reseñas.map(r => `⭐ ${r.rating} - ${r.comentario}`).join("<br/>")}
              </div>
            </div>
          `
          overlay.setPosition(evt.coordinate)
        }
      })
    })
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
  height: 100vh;
}

/* Popup estilo tarjeta */
.ol-popup {
  background: white;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,.3);
  max-width: 260px;
  font-family: Roboto, Arial, sans-serif;
}

.card-lugar img.imagen {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 6px;
}

.card-lugar h3 {
  margin: 4px 0;
  font-size: 16px;
  font-weight: bold;
}

.card-lugar p {
  font-size: 13px;
  color: #555;
  margin: 2px 0;
}

.reseñas {
  font-size: 12px;
  margin-top: 6px;
}

.acciones {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.acciones button {
  flex: 1;
  margin: 0 2px;
  padding: 6px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  background: #007AFF;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.acciones button:hover {
  background: #005BBB;
}
</style>