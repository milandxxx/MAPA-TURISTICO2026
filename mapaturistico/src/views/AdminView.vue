<template>
  <div class='container'>
    <h2>Admin</h2>

    <input v-model='form.nombre' placeholder='Nombre' />
    <input v-model='form.descripcion' placeholder='Descripción' />
    <input v-model.number='form.precio' placeholder='Precio' />
    <input v-model.number='form.rating' placeholder='Rating' />
    <input v-model='form.imagen' placeholder='Imagen URL' />

    <select v-model='form.categoria_id'>
      <option disabled value=''>Categoría</option>
      <option v-for='c in categorias' :key='c.id' :value='c.id'>
        {{ c.nombre }}
      </option>
    </select>

    <button @click='guardar'>Guardar</button>

    <ul>
      <li v-for='l in lugares' :key='l.id'>
        {{ l.nombre }} ({{ l.categoria }})
        <button @click='editar(l)'>Editar</button>
        <button @click='eliminar(l.id)'>Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  getLugares,
  createLugar,
  updateLugar,
  deleteLugar,
  getCategorias
} from '../store/lugares'

const lugares = ref([])
const categorias = ref([])

const form = ref({
  id: null,
  nombre: '',
  descripcion: '',
  precio: 0,
  rating: 0,
  imagen: '',
  categoria_id: ''
})

onMounted(async () => {
  lugares.value = await getLugares()
  categorias.value = await getCategorias()
})

const guardar = async () => {
  if (form.value.id) {
    await updateLugar(form.value.id, form.value)
  } else {
    form.value.id = Date.now()
    await createLugar(form.value)
  }

  lugares.value = await getLugares()
}

const editar = (l) => {
  form.value = { ...l }
}

const eliminar = async (id) => {
  await deleteLugar(id)
  lugares.value = await getLugares()
}
</script>
