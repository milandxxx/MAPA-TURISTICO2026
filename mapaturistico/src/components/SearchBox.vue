<template>
  <div class="search-box">
    <input v-model="texto" @input="emitir" placeholder="Buscar..." />
  </div>
</template>

<script setup>
/* global defineEmits */
import { ref } from 'vue'

const texto = ref('')
const emit = defineEmits(['buscar'])

const emitir = () => {
  emit('buscar', texto.value)
}
</script>