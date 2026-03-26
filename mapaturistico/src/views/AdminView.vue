<template>
  <!-- 
    Contenedor principal del panel admin.
    Se muestra solo si hay sesión activa.
  -->
  <div class="admin-container" v-if="auth">

    <!-- Encabezado -->
    <header class="admin-header">
      <h1>Panel de Administración</h1>

      <!-- 
        Botón para cerrar sesión.
        Limpia localStorage y redirige al inicio.
      -->
      <button @click="logout">Cerrar sesión</button>
    </header>

    <!-- 
      Sección para crear nuevos lugares
    -->
    <section class="form-section">
      <h2>Agregar nuevo lugar</h2>

      <input v-model="nuevo.nombre" placeholder="Nombre" />
      <input v-model="nuevo.info" placeholder="Descripción" />
      <input v-model.number="nuevo.precio" type="number" placeholder="Precio" />

      <button @click="agregarLugar">Guardar</button>
    </section>

    <!-- 
      Lista de lugares existentes
    -->
    <section class="list-section">
      <h2>Lista de lugares</h2>

      <div class="card" v-for="l in lista" :key="l.id">

        <div>
          <strong>{{ l.nombre }}</strong>
          <p>{{ l.info }}</p>
          <span>${{ l.precio }}</span>
        </div>

        <!-- 
          Acciones por cada lugar
        -->
        <div class="acciones">
          
          <!-- Toggle activo -->
          <button @click="toggleEstado(l)">
            {{ l.activo ? 'Desactivar' : 'Activar' }}
          </button>

          <!-- Eliminar -->
          <button class="delete" @click="eliminarLugar(l.id)">
            Eliminar
          </button>

        </div>

      </div>
    </section>

  </div>

  <!-- 
    Mensaje si alguien intenta entrar sin sesión
  -->
  <div v-else>
    <h2>No autorizado</h2>
  </div>
</template>

<script setup>
/*
  Importaciones base:
  - ref: estado reactivo
  - onMounted: cargar datos al iniciar
  - router: navegación
*/
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { lugares as dataInicial } from '../utils/lugares'

const router = useRouter()

/*
  Validación de sesión
*/
const auth = ref(localStorage.getItem('auth'))

/*
  Lista principal de lugares (reactiva)
*/
const lista = ref([])

/*
  Objeto para crear nuevos lugares
*/
const nuevo = ref({
  nombre: '',
  info: '',
  precio: 0
})

/*
  Cargar datos:
  - Si hay datos guardados en localStorage, usarlos
  - Si no, usar los datos iniciales
*/
onMounted(() => {
  const guardados = localStorage.getItem('lugares')

  lista.value = guardados ? JSON.parse(guardados) : dataInicial
})

/*
  Guardar cambios en localStorage
*/
const guardar = () => {
  localStorage.setItem('lugares', JSON.stringify(lista.value))
}

/*
  Agregar nuevo lugar
*/
const agregarLugar = () => {
  if (!nuevo.value.nombre) return

  lista.value.push({
    id: Date.now(),
    nombre: nuevo.value.nombre,
    info: nuevo.value.info,
    precio: nuevo.value.precio,
    activo: true
  })

  guardar()

  // Limpiar formulario
  nuevo.value = { nombre: '', info: '', precio: 0 }
}

/*
  Activar / desactivar lugar
*/
const toggleEstado = (lugar) => {
  lugar.activo = !lugar.activo
  guardar()
}

/*
  Eliminar lugar
*/
const eliminarLugar = (id) => {
  lista.value = lista.value.filter(l => l.id !== id)
  guardar()
}

/*
  Cerrar sesión
*/
const logout = () => {
  localStorage.removeItem('auth')
  router.push('/')
}
</script>

<style scoped>

/* Contenedor general */
.admin-container {
  padding: 20px;
}

/* Header */
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Formulario */
.form-section {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

/* Lista */
.list-section {
  margin-top: 20px;
}

/* Card */
.card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

/* Acciones */
.acciones {
  display: flex;
  gap: 10px;
}

.delete {
  background: red;
  color: white;
}

</style>