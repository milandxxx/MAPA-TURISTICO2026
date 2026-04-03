<<<<<<< Updated upstream
<template>
  <div class="admin-page" v-if="isAdmin">
    <Navbar />
    <h2>Panel de Administración</h2>

    <div class="admin-actions">
      <button @click="agregarLugar">➕ Agregar lugar</button>
    </div>

    <div class="admin-list">
      <div v-for="l in lugares" :key="l.id" class="admin-card">
        <h3>{{ l.nombre }}</h3>
        <div class="admin-buttons">
          <button @click="editarLugar(l)">✏️ Editar</button>
          <button @click="eliminarLugar(l.id)">🗑️ Eliminar</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="no-access">
    <Navbar />
    <h2>Acceso restringido</h2>
    <p>Debes iniciar sesión como administrador para ver este panel.</p>
    <router-link to="/login">Ir al login</router-link>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { lugares } from '../data/lugares.js'

export default {
  name: "AdminView",
  components: { Navbar },
  ddata() {
  return {
    lugares,
    isAdmin: localStorage.getItem("isAdmin") === "true"
  }
  },
  methods: {
    agregarLugar() { alert("Función agregar lugar") },
    editarLugar(l) { alert("Editar " + l.nombre) },
    eliminarLugar(id) { alert("Eliminar lugar " + id) }
  }
}
</script>

<style scoped>
.admin-page {
  padding: 2rem;
  font-family: Roboto, Arial, sans-serif;
  background: #f8f6f1;
  min-height: 100vh;
}
h2 {
  color: #0a4f6e;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: 500;
  animation: fadeInDown 0.6s ease-in-out;
}
.admin-actions {
  margin-bottom: 1.5rem;
}
.admin-actions button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background: #1a7a5e;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.3s ease, transform 0.2s ease;
}
.admin-actions button:hover {
  background: #145a9c;
  transform: translateY(-2px);
}
.admin-list {
  display: grid;
  gap: 1rem;
  animation: fadeIn 0.8s ease-in-out;
}
.admin-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.admin-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}
.admin-card h3 {
  margin: 0;
  font-size: 16px;
  color: #0a4f6e;
  font-weight: 600;
}
.admin-buttons button {
  margin-left: 8px;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #1976d2;
  color: white;
  font-size: 13px;
  transition: background 0.3s ease, transform 0.2s ease;
}
.admin-buttons button:hover {
  background: #145a9c;
  transform: scale(1.05);
}
.no-access {
  padding: 3rem;
  text-align: center;
  font-family: Roboto, Arial, sans-serif;
}
.no-access h2 {
  color: #cc3333;
  margin-bottom: 1rem;
}
.no-access p {
  color: #555;
  margin-bottom: 1.5rem;
}
.no-access a {
  color: #1976d2;
  text-decoration: none;
  font-weight: 600;
}
.no-access a:hover {
  text-decoration: underline;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 600px) {
  .admin-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .admin-buttons {
    display: flex;
    gap: 8px;
  }
  .admin-actions button {
    width: 100%;
  }
}
</style>
=======
<script setup>
import { ref, onMounted } from "vue"
import { getLugares, saveLugares } from "../data/lugares"
import { useRouter } from "vue-router"

const router = useRouter()
const auth = ref(localStorage.getItem("auth") === "true")

const lugares = ref([])
const nuevo = ref({ nombre:"", precio:0, disponible:true })

onMounted(() => {
  lugares.value = getLugares()
})

const agregar = () => {
  const item = { ...nuevo.value, id: Date.now() }
  lugares.value.push(item)
  saveLugares(lugares.value)
}

const eliminar = (id) => {
  lugares.value = lugares.value.filter(l => l.id !== id)
  saveLugares(lugares.value)
}

const logout = () => {
  localStorage.removeItem("auth")
  router.push("/")
}
</script>

<template>
  <div>
    <h2>Admin</h2>

    <div v-if="auth">
      <input v-model="nuevo.nombre" placeholder="Nombre" />
      <input v-model="nuevo.precio" type="number" />

      <label>
        <input type="checkbox" v-model="nuevo.disponible" />
        Disponible
      </label>

      <button @click="agregar">Agregar</button>

      <div v-for="l in lugares" :key="l.id">
        {{ l.nombre }} - ${{ l.precio }}
        <button @click="eliminar(l.id)">X</button>
      </div>

      <button @click="logout">Salir</button>
    </div>

    <p v-else>No autorizado</p>
  </div>
</template>
>>>>>>> Stashed changes
