<template>
  <div class="admin">

    <button class="logout" @click="logout">Cerrar sesión</button>

    <h1>Panel Admin</h1>

    <form @submit.prevent="guardar">
      <input v-model="form.nombre" placeholder="Nombre" required />
      <input v-model="form.descripcion" placeholder="Descripción" />
      <input v-model.number="form.lat" placeholder="Latitud" />
      <input v-model.number="form.lon" placeholder="Longitud" />
      <input v-model="form.imagen" placeholder="Imagen URL" />
      <button type="submit">
        {{ editando ? "Actualizar" : "Crear" }}
      </button>
    </form>

    <table>
      <tr>
        <th>Nombre</th>
        <th>Acciones</th>
      </tr>

      <tr v-for="l in lugares" :key="l.id">
        <td>{{ l.nombre }}</td>
        <td>
          <button @click="editar(l)">Editar</button>
          <button @click="eliminar(l.id)">Eliminar</button>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      lugares: [],
      editando: false,
      idEditando: null,
      form: {
        nombre: "",
        descripcion: "",
        lat: "",
        lon: "",
        imagen: ""
      }
    };
  },

  mounted() {
    this.cargar();
  },

  methods: {
    async cargar() {
      const res = await api.get("/lugares");
      this.lugares = res.data;
    },

    async guardar() {
      if (this.editando) {
        await api.put(`/lugares/${this.idEditando}`, this.form);
      } else {
        await api.post("/lugares", this.form);
      }

      this.reset();
      this.cargar();
    },

    editar(l) {
      this.editando = true;
      this.idEditando = l.id;
      this.form = { ...l };
    },

    async eliminar(id) {
      await api.delete(`/lugares/${id}`);
      this.cargar();
    },

    reset() {
      this.editando = false;
      this.idEditando = null;
      this.form = {
        nombre: "",
        descripcion: "",
        lat: "",
        lon: "",
        imagen: ""
      };
    },

    logout() {
      localStorage.removeItem("auth");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.admin {
  padding: 20px;
  position: relative;
}

.logout {
  position: absolute;
  top: 20px;
  right: 20px;
  background: red;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

table {
  width: 100%;
}
</style>