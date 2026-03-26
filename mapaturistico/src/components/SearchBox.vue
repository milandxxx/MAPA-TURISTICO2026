<template>
  <input v-model="texto" placeholder="Buscar lugar..." />
</template>

<script setup>
import { ref, watch } from 'vue'
const texto = ref('')
const emit = defineEmits(['buscar'])
watch(texto, val => emit('buscar', val))
</script>
