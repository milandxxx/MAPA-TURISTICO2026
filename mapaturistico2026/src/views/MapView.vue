<template>
<div class='layout'>
<div class='sidebar'>
<input v-model='busqueda'/>
<div v-for='l in filtrados' @click='sel(l)'>{{l.nombre}}</div>
<button v-if='o&&d' @click='ruta'>Ruta</button>
<p v-if='info'>{{info.dist}} km - {{info.time}} min</p>
</div>
<div id='map' class='map'></div>
</div>
</template>

<script setup>
import { ref,computed,onMounted } from 'vue'
import { useLugares } from '../store/lugaresStore'
import { loading,showToast } from '../store/uiStore'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import LineString from 'ol/geom/LineString'
import { fromLonLat } from 'ol/proj'

const {lugares}=useLugares()
const busqueda=ref('')
const o=ref(null)
const d=ref(null)
const info=ref(null)

let map,view,layer

const filtrados=computed(()=>lugares.value.filter(l=>l.nombre.toLowerCase().includes(busqueda.value.toLowerCase())))

onMounted(()=>{
view=new View({center:fromLonLat([-74.2,11.2]),zoom:12})
map=new Map({target:'map',layers:[new TileLayer({source:new OSM()})],view})
})

const sel=l=>{if(!o.value)o.value=l;else d.value=l}

const ruta=async()=>{
try{
loading.value=true
const url=https://router.project-osrm.org/route/v1/driving/,;,?overview=full&geometries=geojson
const res=await fetch(url)
const data=await res.json()
const r=data.routes[0]
info.value={dist:(r.distance/1000).toFixed(2),time:Math.round(r.duration/60)}
const coords=r.geometry.coordinates.map(c=>fromLonLat(c))
const line=new Feature({geometry:new LineString(coords)})
const src=new VectorSource({features:[line]})
if(layer)map.removeLayer(layer)
layer=new VectorLayer({source:src})
map.addLayer(layer)
}catch(e){showToast('error')}
finally{loading.value=false}
}
</script>

<style>
.layout{display:flex;height:100vh}
.sidebar{width:300px;background:#111;color:#fff;padding:10px}
.map{flex:1}
</style>
