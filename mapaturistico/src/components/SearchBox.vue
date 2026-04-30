<template>
  <div class="search">
    <input v-model="texto" placeholder="Buscar..." />
    <button @click="$emit('buscar', texto)">Buscar</button>
  </div>
</template>

<script>
export default {
  data() {
    return { texto: '' }
  }
}
</script>