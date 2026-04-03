<template>
  <div class='login'>
    <h2>Login</h2>

    <input v-model='user' placeholder='Usuario' />
    <input v-model='pass' type='password' placeholder='Contraseña' />

    <button @click='login'>Entrar</button>

    <p v-if='error' class='error'>{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref('')
const pass = ref('')
const error = ref('')
const router = useRouter()

function login() {
  error.value = ''

  if (!user.value || !pass.value) {
    error.value = 'Campos obligatorios'
    return
  }

  if (user.value === 'admin' && pass.value === '1234') {
    localStorage.setItem('auth','true')
    router.push('/admin')
  } else {
    error.value = 'Credenciales incorrectas'
  }
}
</script>

<style scoped>
.error { color:red; }
</style>
