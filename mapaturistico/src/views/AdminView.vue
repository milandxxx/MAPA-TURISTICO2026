<template>
  <div>
    <input v-model='nuevo.nombre' placeholder='Nombre'/>
    <button @click='agregar'>Agregar</button>

    <div v-for='l in lugares' :key='l.id'>
      {{ l.nombre }}
      <button @click='eliminar(l.id)'>X</button>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      lugares: [],
      nuevo: { nombre: '' }
    }
  },
  async mounted() {
    this.cargar()
  },
  methods: {
    async cargar() {
      const res = await api.get('/lugares')
      this.lugares = res.data
    },
    async agregar() {
      await api.post('/lugares', this.nuevo)
      this.nuevo = { nombre: '' }
      this.cargar()
    },
    async eliminar(id) {
      await api.delete('/lugares/' + id)
      this.cargar()
    }
  }
}
</script>
