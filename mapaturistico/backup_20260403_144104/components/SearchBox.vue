<template>
  <div>
    <input v-model='texto' placeholder='Buscar...' />
    <button @click='emitir'>Buscar</button>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      texto: ''
    }
  },
  methods: {
    emitir() {
      this.\('buscar', this.texto)
    }
  }
}
</script>
