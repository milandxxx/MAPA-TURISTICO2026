<template>
  <div class="admin">

    <h2>Admin</h2>

    <!-- ALERTAS -->
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading" class="loading">Cargando...</div>

    <!-- BUSQUEDA -->
    <input v-model="search" @input="loadData" placeholder="Buscar..." />

    <!-- FORM -->
    <div class="form">
      <input v-model="form.nombre" placeholder="Nombre" />
      <input v-model.number="form.precio" placeholder="Precio" />
      <input v-model="form.categoria" placeholder="Categoría" />
      <input v-model.number="form.lat" placeholder="Lat" />
      <input v-model.number="form.lng" placeholder="Lng" />

      <button v-if="!editando" @click="crear">Crear</button>
      <button v-else @click="actualizar">Actualizar</button>
    </div>

    <!-- LISTA -->
    <ul>
      <li v-for="l in lugares" :key="l.id">
        {{ l.nombre }} - ${{ l.precio }}

        <button @click="editar(l)">✏️</button>
        <button @click="fav(l.id)">⭐</button>
        <button @click="remove(l.id)">🗑</button>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useLugares from '../composables/useLugares'
import { validateLugar } from '../utils/validate'

const { lugares, load, create, update, remove, fav, loading, error } = useLugares()

const search = ref('')
const editando = ref(false)
const id = ref(null)

const form = ref({
  nombre: '',
  precio: 0,
  categoria: '',
  lat: 0,
  lng: 0
})

onMounted(loadData)

function loadData() {
  load({ search: search.value })
}

async function crear() {
  const err = validateLugar(form.value)
  if (err) return alert(err)

  await create(form.value)
  limpiar()
}

function editar(l) {
  form.value = { ...l }
  id.value = l.id
  editando.value = true
}

async function actualizar() {
  const err = validateLugar(form.value)
  if (err) return alert(err)

  await update(id.value, form.value)
  limpiar()
}

function limpiar() {
  form.value = { nombre: '', precio: 0, categoria: '', lat: 0, lng: 0 }
  editando.value = false
}
</script>

<style scoped>
.admin { padding: 20px }
.form { display: flex; gap: 10px; margin: 10px 0 }
.error { color: red }
.loading { color: blue }
</style>