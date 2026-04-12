<template>
  <div>
    <input v-model='user' placeholder='usuario' />
    <input v-model='pass' type='password' placeholder='contraseña' />
    <button @click='login'>Entrar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref('')
const pass = ref('')
const router = useRouter()

const login = () => {
  if (user.value === 'admin' && pass.value === '1234') {
    localStorage.setItem('auth', true)
    router.push('/admin')
  }
}
</script>
