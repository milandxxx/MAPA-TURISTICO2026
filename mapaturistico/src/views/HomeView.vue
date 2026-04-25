import axios from 'axios'

const api = axios.========================
@"
<template>
  <div>
    <SearchBox @search='filtrar' />
    <CardLugar v-for='l in filtrados' :key='l.id' :lugar='l' />
  </div>
</template>

<script>
import api from '../services/api'
import CardLugar from '../components/CardLugar.vue'
import SearchBox from '../components/SearchBox.vue'

export default {
  components: { CardLugar, SearchBox },
  data() {
    return {
      lugares: [],
      filtrados: []
    }
  },
  async mounted() {
    const res = await api.get('/lugares')
    this.lugares = res.data
    this.filtrados = res.data
  },
  methods: {
    filtrar(q) {
      this.filtrados = this.lugares.filter(l =>
        l.nombre.toLowerCase().includes(q.toLowerCase())
      )
    }
  }
}
</script>
