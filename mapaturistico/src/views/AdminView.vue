<template>
  <div class="admin">

    <div class="form">
      <input v-model="nuevo.nombre" placeholder="Nombre">
      <input v-model="nuevo.precio" type="number" placeholder="Precio">
      <input v-model="nuevo.lat" placeholder="Lat">
      <input v-model="nuevo.lon" placeholder="Lon">

      <label>
        <input type="checkbox" v-model="nuevo.disponible">
        Disponible
      </label>

      <button @click="guardar">
        {{ editando ? 'Actualizar' : 'Agregar' }}
      </button>

      <p v-if="error">{{ error }}</p>
    </div>

    <div v-for="l in lugares" :key="l.id">
      {{ l.nombre }}
      <button @click="cargar(l)">Editar</button>
      <button @click="eliminar(l.id)">Eliminar</button>
    </div>

    <button @click="logout">Salir</button>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLugares } from '../store/lugaresStore'

const { lugares, agregar, editar, eliminar } = useLugares()
const router = useRouter()

const nuevo = ref({ nombre:'', precio:'', lat:'', lon:'', disponible:true })
const editando = ref(false)
const error = ref('')

const guardar = () => {
  error.value = ''

  let ok = false

  if (editando.value) {
    ok = editar(nuevo.value)
  } else {
    ok = agregar(nuevo.value)
  }

  if (!ok) {
    error.value = 'Datos inválidos'
    return
  }

  nuevo.value = { nombre:'', precio:'', lat:'', lon:'', disponible:true }
  editando.value = false
}

const cargar = (l) => {
  nuevo.value = { ...l }
  editando.value = true
}

const logout = () => {
  localStorage.removeItem('auth')
  router.push('/')
}
</script>