<template><input @input='h' placeholder='Buscar'/></template>
<script setup>
import { debounce } from '../utils/debounce'
const emit=defineEmits(['buscar'])
const h=debounce(e=>emit('buscar',e.target.value),300)
</script>
