<template>
  <div class="login">

    <h2>Login</h2>

    <input v-model="user" placeholder="Usuario" />
    <input v-model="pass" type="password" placeholder="Contraseña" />

    <button @click="login">Entrar</button>

    <p v-if="error">{{ error }}</p>

  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      pass: '',
      error: null
    }
  },

  methods: {
    login() {
      // NO CAMBIAR: control simple de acceso
      if (this.user === 'admin' && this.pass === '1234') {
        localStorage.setItem('auth', 'true')
        this.$router.push('/admin')
      } else {
        this.error = 'Datos incorrectos'
      }
    }
  }
}
</script>

<style>
.login {
  width: 250px;
  margin: 60px auto;
  text-align: center;
}

input {
  display: block;
  margin: 10px auto;
  padding: 8px;
}
</style>