<template>
<div class='map-container'>
<div class='sidebar'>
<div v-for='l in lugares' :key='l.id' @click='irLugar(l)'>{{ l.nombre }}</div>
</div>
<div id='map' class='map'></div>
</div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { getLugares } from '../store/lugares'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style,Icon } from 'ol/style'

const lugares = ref([])
let map,vectorSource

onMounted(async()=>{
lugares.value = await getLugares()

vectorSource = new VectorSource()
const vectorLayer = new VectorLayer({ source:vectorSource })

map = new Map({
target:'map',
layers:[ new TileLayer({source:new OSM()}), vectorLayer ],
view:new View({ center:fromLonLat([-74.2,11.2]), zoom:10 })
})

lugares.value.forEach(l=>{
if(!l.lat||!l.lng) return
const m = new Feature({ geometry:new Point(fromLonLat([l.lng,l.lat])) })
m.setStyle(new Style({ image:new Icon({ src:'https://cdn-icons-png.flaticon.com/512/684/684908.png', scale:0.05 }) }))
vectorSource.addFeature(m)
})
})

const irLugar = l=>{
map.getView().animate({ center:fromLonLat([l.lng,l.lat]), zoom:14, duration:800 })
}
</script>

<style scoped>
.map-container{display:flex;height:100vh}
.sidebar{width:250px;background:white}
.map{flex:1}
</style>
