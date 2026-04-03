<template>
  <div v-if='auth'>
    <h2>Panel Admin</h2>
    <button @click='logout'>Cerrar sesión</button>
  </div>

  <div v-else>
    <p>No autorizado</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = ref(false)

onMounted(() => {
  auth.value = localStorage.getItem('auth') === 'true'
  if (!auth.value) router.push('/login')
})

function logout() {
  localStorage.removeItem('auth')
  router.push('/')
}
</script>
