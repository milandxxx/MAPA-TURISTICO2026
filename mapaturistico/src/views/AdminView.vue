<template>
  <div class="admin">

    <h2>Admin</h2>

    <div class="form">
      <input v-model="form.nombre" placeholder="Nombre" />
      <input v-model="form.desc" placeholder="Desc" />
      <input v-model="form.precio" placeholder="Precio" />

      <button @click="guardar">Guardar</button>
    </div>

    <ul>
      <li v-for="l in lugares" :key="l.id">
        {{ l.nombre }}

        <button @click="editar(l)">Edit</button>
        <button @click="eliminar(l.id)">X</button>
      </li>
    </ul>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      lugares: [],
      form: { nombre: '', desc: '', precio: 0 },
      id: null
    }
  },

  methods: {
    async cargar() {
      const res = await axios.get('http://127.0.0.1:8000/lugares')
      this.lugares = res.data
    },

    async guardar() {
      // NO QUITAR: decide entre crear o editar
      if (this.id) {
        await axios.put(`http://127.0.0.1:8000/lugares/${this.id}`, this.form)
      } else {
        await axios.post('http://127.0.0.1:8000/lugares', this.form)
      }

      this.form = { nombre: '', desc: '', precio: 0 }
      this.id = null

      this.cargar()
    },

    editar(l) {
      this.form = { ...l }
      this.id = l.id
    },

    async eliminar(id) {
      await axios.delete(`http://127.0.0.1:8000/lugares/${id}`)
      this.cargar()
    }
  },

  mounted() {
    this.cargar()
  }
}
</script>

<style>
.admin {
  padding: 20px;
}

input {
  margin: 5px;
  padding: 5px;
}
</style>