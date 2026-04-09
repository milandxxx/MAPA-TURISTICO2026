<template><div id='map'></div></template>
<script setup>
import { onMounted } from 'vue'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

onMounted(()=>{
new Map({
target:'map',
layers:[new TileLayer({source:new OSM()})],
view:new View({center:[0,0],zoom:2})
})
})
</script>
<style>#map{width:100%;height:100vh;}</style>
