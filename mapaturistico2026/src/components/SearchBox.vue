<template>
<input v-model='texto' @input='("buscar", texto)' placeholder='Buscar...' />
</template>
<script setup>
import { ref } from 'vue'
const texto = ref('')
</script>
