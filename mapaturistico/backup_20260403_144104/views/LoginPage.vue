<template>
  <div class='login'>
    <h2>Login</h2>

    <input v-model='user' placeholder='Usuario' />
    <input v-model='pass' type='password' placeholder='Contraseña' />

    <button @click='login'>Entrar</button>

    <p v-if='error' class='error'>{{ error }}</p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      user: '',
      pass: '',
      error: ''
    }
  },
  methods: {
    login() {
      this.error = ''

      if (!this.user || !this.pass) {
        this.error = 'Campos obligatorios'
        return
      }

      if (this.user === 'admin' && this.pass === '1234') {
        localStorage.setItem('auth','true')
        this..push('/admin')
      } else {
        this.error = 'Credenciales incorrectas'
      }
    }
  }
}
</script>

<style scoped>
.error { color:red; }
</style>
