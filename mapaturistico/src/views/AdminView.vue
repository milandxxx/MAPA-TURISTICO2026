<template>
  <div>
    <h1>Admin</h1>
    <button @click='logout'>Salir</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function logout() {
  localStorage.removeItem('auth')
  router.push('/')
}
</script>
