<template>
  <div class="admin">

    <div class="header">
      <h1>Panel Administrativo</h1>
      <button class="logout" @click="logout">Salir</button>
    </div>

    <div class="card-form">
      <h2>{{ editando ? "Editar Lugar" : "Nuevo Lugar" }}</h2>

      <form @submit.prevent="guardar">
        <div class="grid">
          <input v-model="form.nombre" placeholder="Nombre" />
          <input v-model="form.descripcion" placeholder="Descripción" />
          <input v-model.number="form.lat" placeholder="Latitud" />
          <input v-model.number="form.lon" placeholder="Longitud" />
          <input v-model="form.imagen" placeholder="URL Imagen" />
        </div>

        <button type="submit" class="btn-primary">
          {{ editando ? "Actualizar" : "Crear" }}
        </button>
      </form>
    </div>

    <div class="card-table">
      <h2>Lugares</h2>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="l in lugares" :key="l.id">
            <td>{{ l.nombre }}</td>
            <td class="acciones">
              <button class="edit" @click="editar(l)">Editar</button>
              <button class="delete" @click="eliminar(l.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- NOTIFICACIÓN -->
    <transition name="fade">
      <div v-if="toast.show" :class="['toast', toast.type]">
        {{ toast.msg }}
      </div>
    </transition>

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
      },
      toast: {
        show: false,
        msg: "",
        type: "success"
      }
    };
  },

  mounted() {
    if (!localStorage.getItem("auth")) {
      this.$router.push("/login");
    }
    this.cargar();
  },

  methods: {
    async cargar() {
      const res = await api.get("/lugares");
      this.lugares = res.data;
    },

    validar() {
      if (!this.form.nombre) {
        this.notify("El nombre es obligatorio", "error");
        return false;
      }
      if (!this.form.lat || !this.form.lon) {
        this.notify("Coordenadas inválidas", "error");
        return false;
      }
      return true;
    },

    async guardar() {
      if (!this.validar()) return;

      try {
        if (this.editando) {
          await api.put(`/lugares/${this.idEditando}`, this.form);
          this.notify("Lugar actualizado");
        } else {
          await api.post("/lugares", this.form);
          this.notify("Lugar creado");
        }

        this.reset();
        this.cargar();
      } catch (e) {
        this.notify("Error al guardar", "error");
      }
    },

    editar(l) {
      this.editando = true;
      this.idEditando = l.id;
      this.form = { ...l };
    },

    async eliminar(id) {
      try {
        await api.delete(`/lugares/${id}`);
        this.notify("Lugar eliminado");
        this.cargar();
      } catch {
        this.notify("Error al eliminar", "error");
      }
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

    notify(msg, type = "success") {
      this.toast.msg = msg;
      this.toast.type = type;
      this.toast.show = true;

      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
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
  padding: 30px;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout {
  background: #ff4d4d;
  border: none;
  padding: 8px 15px;
  color: white;
  cursor: pointer;
  border-radius: 6px;
}

.card-form,
.card-table {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 20px;
  margin-top: 20px;
  border-radius: 12px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

input {
  padding: 10px;
  border-radius: 6px;
  border: none;
}

.btn-primary {
  margin-top: 10px;
  padding: 10px;
  background: #00c6ff;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 6px;
}

table {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
}

.acciones button {
  margin-right: 5px;
}

.edit {
  background: #ffaa00;
  border: none;
  padding: 5px 10px;
  color: white;
}

.delete {
  background: #ff4d4d;
  border: none;
  padding: 5px 10px;
  color: white;
}

/* TOAST */
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px;
  border-radius: 8px;
  color: white;
}

.success {
  background: #00c851;
}

.error {
  background: #ff4444;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>