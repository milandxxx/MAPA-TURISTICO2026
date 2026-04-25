<template>
  <div class="admin">
    <h2>⚙️ Panel de Administración</h2>

    <!-- Formulario -->
    <form @submit.prevent="guardarLugar" class="form">
      <input v-model="form.id" type="number" placeholder="ID" required />
      <input v-model="form.nombre" type="text" placeholder="Nombre" required />
      <textarea v-model="form.descripcion" placeholder="Descripción"></textarea>
      <div class="buttons">
        <button type="submit">{{ editando ? "Actualizar" : "Agregar" }}</button>
        <button v-if="editando" type="button" @click="cancelarEdicion" class="cancel">Cancelar</button>
      </div>
    </form>

    <!-- Lista de lugares -->
    <div v-if="loading">
      <Skeleton width="100%" height="100px" v-for="n in 3" :key="n" class="mb-2"/>
    </div>
    <div v-else>
      <h3>Lugares registrados</h3>
      <ul class="list">
        <li v-for="l in lugares" :key="l.id" class="item">
          <div class="info">
            <strong>{{ l.nombre }}</strong>
            <p>{{ l.descripcion }}</p>
          </div>
          <div class="actions">
            <button @click="editarLugar(l)" class="edit">Editar</button>
            <button @click="eliminarLugar(l.id)" class="delete">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "../services/api"
import Skeleton from "primevue/skeleton"

export default {
  name: "AdminView",
  components: { Skeleton },
  data() {
    return {
      lugares: [],
      loading: true,
      form: { id: "", nombre: "", descripcion: "" },
      editando: false
    }
  },
  created() {
    this.cargarLugares()
  },
  methods: {
    cargarLugares() {
      this.loading = true
      api.get("/lugares")
        .then(res => { this.lugares = res.data })
        .catch(err => console.error(err))
        .finally(() => { this.loading = false })
    },
    guardarLugar() {
      if (this.editando) {
        api.put(`/lugares/${this.form.id}`, this.form)
          .then(() => {
            this.cargarLugares()
            this.cancelarEdicion()
          })
          .catch(err => console.error(err))
      } else {
        api.post("/lugares", this.form)
          .then(() => {
            this.cargarLugares()
            this.form = { id: "", nombre: "", descripcion: "" }
          })
          .catch(err => console.error(err))
      }
    },
    editarLugar(lugar) {
      this.form = { ...lugar }
      this.editando = true
    },
    cancelarEdicion() {
      this.form = { id: "", nombre: "", descripcion: "" }
      this.editando = false
    },
    eliminarLugar(id) {
      api.delete(`/lugares/${id}`)
        .then(() => this.cargarLugares())
        .catch(err => console.error(err))
    }
  }
}
</script>

<style>
.admin {
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-width: 800px;
  margin: 30px auto;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #007BFF;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}
.form input, .form textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.buttons {
  display: flex;
  gap: 10px;
}
.form button {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.form button[type="submit"] {
  background: #28a745;
  color: #fff;
}
.form button.cancel {
  background: #6c757d;
  color: #fff;
}
.list {
  list-style: none;
  padding: 0;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
.info p {
  margin: 5px 0 0;
  color: #555;
}
.actions button {
  margin-left: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.actions .edit {
  background: #007BFF;
  color: #fff;
}
.actions .delete {
  background: #dc3545;
  color: #fff;
}
.actions button:hover {
  opacity: 0.9;
}
.mb-2 { margin-bottom:10px; }
</style>
