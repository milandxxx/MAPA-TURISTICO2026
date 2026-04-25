<template>
  <div class="search">
    <input v-model="query" placeholder="Buscar..." />
    <button @click="emitir">Buscar</button>
  </div>
</template>

<script>
export default {
  data() {
    return { query: "" }
  },
  methods: {
    emitir() {
      this.$emit("buscar", this.query)
    }
  }
}
</script>

<style>
.search { display:flex; gap:10px; }
</style>
