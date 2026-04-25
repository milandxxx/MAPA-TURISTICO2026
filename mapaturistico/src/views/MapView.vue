<template>
  <div>
    <SearchBox @buscar='buscarLugar'/>
    <div id='map' style='height:400px'></div>
  </div>
</template>

<script>
import SearchBox from '../components/SearchBox.vue'
import 'ol/ol.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'

export default {
  components:{ SearchBox },
  mounted(){
    new Map({
      target:'map',
      layers:[ new TileLayer({ source:new OSM() }) ],
      view:new View({ center: fromLonLat([-74.2,11.2]), zoom:12 })
    })
  },
  methods:{
    buscarLugar(q){ console.log(q) }
  }
}
</script>

<style></style>
