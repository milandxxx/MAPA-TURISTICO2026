<template>
  <input
    v-model="query"
    @keydown="emitSearch"
    @dblclick="clear"
    @mouseover="hover = true"
    @mousedown="logClick"
    placeholder="Buscar..."
  />
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])
const query = ref('')
const hover = ref(false)

const emitSearch = () => emit('search', query.value)
const clear = () => (query.value = '')
const logClick = () => console.log('mousedown')
</script>

<style scoped>
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}
</style>