<template>
  <div>
    <input v-model='user' placeholder='usuario' />
    <input v-model='pass' type='password' />
    <button @click='login'>Entrar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref('')
const pass = ref('')

function login() {
  if (user.value === 'admin' && pass.value === '1234') {
    localStorage.setItem('auth', 'true')
    router.push('/admin')
  }
}
</script>
