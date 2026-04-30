<template>
  <div class="admin">

    <h2>Panel Admin</h2>

    <button class="logout" @click="logout">Cerrar sesión</button>

    <div class="form">
      <input v-model="form.nombre" placeholder="Nombre" />
      <input v-model="form.descripcion" placeholder="Descripción" />
      <input v-model="form.lat" placeholder="Latitud" />
      <input v-model="form.lng" placeholder="Longitud" />
      <input v-model="form.imagen" placeholder="Imagen URL" />

      <button @click="guardar">
        {{ editando ? 'Actualizar' : 'Agregar' }}
      </button>
    </div>

    <div class="lista">
      <div v-for="l in lugares" :key="l.id" class="item">
        <strong>{{ l.nombre }}</strong>
        <p>{{ l.descripcion }}</p>

        <button @click="editar(l)">Editar</button>
        <button @click="eliminar(l.id)">Eliminar</button>
      </div>
    </div>

  </div>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      lugares: [],
      form: {},
      editando: false,
      idEdit: null
    }
  },

  mounted() {
    this.cargar()
  },

  methods: {

    async cargar() {
      const res = await api.get('/lugares')
      this.lugares = res.data
    },

    async guardar() {
      if (this.editando) {
        await api.put(`/lugares/${this.idEdit}`, this.form)
      } else {
        await api.post('/lugares', this.form)
      }

      this.form = {}
      this.editando = false
      this.cargar()
    },

    editar(l) {
      this.form = { ...l }
      this.idEdit = l.id
      this.editando = true
    },

    async eliminar(id) {
      await api.delete(`/lugares/${id}`)
      this.cargar()
    },

    logout() {
      localStorage.removeItem('auth')
      this.$router.push('/login')
    }

  }
}
</script>

<style scoped>

.admin {
  padding: 20px;
}

.logout {
  margin-bottom: 20px;
  background: red;
  color: white;
  border: none;
  padding: 10px;
}

.form input {
  display: block;
  margin-bottom: 10px;
}

.item {
  border: 1px solid #ccc;
  margin-top: 10px;
  padding: 10px;
}

</style>