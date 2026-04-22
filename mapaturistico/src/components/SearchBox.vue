<template>
  <input v-model='query' @input='\(\"search\", query)' placeholder='Buscar...' />
</template>

<script setup>
import { ref } from 'vue'
const query = ref('')
</script>
