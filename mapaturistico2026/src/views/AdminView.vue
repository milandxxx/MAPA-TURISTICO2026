<template>
  <div class="container">
    <input v-model="form.nombre" placeholder="Nombre"/>
    <button @click="guardar">Guardar</button>

    <div v-for="l in lugares" :key="l.id">
      {{ l.nombre }}
      <button @click="editar(l)">Editar</button>
      <button @click="eliminar(l.id)">Eliminar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const lugares = ref([])
const form = ref({})

async function cargar() {
  const r = await axios.get('http://127.0.0.1:8000/lugares')
  lugares.value = r.data
}

async function guardar() {
  if (form.value.id) {
    await axios.put(`http://127.0.0.1:8000/lugares/${form.value.id}`, form.value)
  } else {
    await axios.post('http://127.0.0.1:8000/lugares', form.value)
  }
  form.value = {}
  cargar()
}

function editar(l) {
  form.value = { ...l }
}

async function eliminar(id) {
  await axios.delete(`http://127.0.0.1:8000/lugares/${id}`)
  cargar()
}

onMounted(cargar)
</script>

<style scoped>
</style>