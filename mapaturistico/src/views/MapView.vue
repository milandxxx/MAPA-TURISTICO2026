<template>
  <div id='map' style='height:100vh'></div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

export default {
  mounted() {
    new Map({
      target: 'map',
      layers: [
        new TileLayer({ source: new OSM() })
      ],
      view: new View({
        center: [-7410000, 1210000],
        zoom: 12
      })
    })
  }
}
</script>
