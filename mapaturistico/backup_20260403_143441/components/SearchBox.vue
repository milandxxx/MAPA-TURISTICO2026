<template>
  <div>
    <input v-model='texto' placeholder='Buscar...' />
    <button @click='emitir'>Buscar</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const texto = ref('')
const emit = defineEmits(['buscar'])

function emitir() {
  emit('buscar', texto.value)
}
</script>
