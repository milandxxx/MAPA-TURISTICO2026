<template>
  <div>
    <SearchBox @search='filter' />

    <div class='grid'>
      <CardLugar
        v-for='l in filtered'
        :key='l.id'
        :lugar='l'
        @fav='fav'
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SearchBox from '../components/SearchBox.vue'
import CardLugar from '../components/CardLugar.vue'
import lugaresAPI from '../store/lugares'

const lugares = ref([])
const filtered = ref([])

onMounted(async () => {
  lugares.value = await lugaresAPI.getLugares()
  filtered.value = lugares.value
})

function filter(q) {
  filtered.value = lugares.value.filter(l =>
    l.nombre.toLowerCase().includes(q.toLowerCase())
  )
}

function fav(id) {
  lugaresAPI.toggleFav(id)
}
</script>
