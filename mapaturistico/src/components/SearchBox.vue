<template>
  <div>
    <input v-model='texto' placeholder='Buscar...' />
    <button @click='emitBuscar'>Buscar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['buscar'])
const texto = ref('')
const emitBuscar = () => emit('buscar', texto.value)
</script>
