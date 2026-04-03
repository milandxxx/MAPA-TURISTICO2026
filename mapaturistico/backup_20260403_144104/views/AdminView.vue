<template>
  <div v-if='auth'>
    <h2>Panel Admin</h2>
    <button @click='logout'>Cerrar sesión</button>
  </div>

  <div v-else>
    <p>No autorizado</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auth: false
    }
  },
  mounted() {
    this.auth = localStorage.getItem('auth') === 'true'
    if (!this.auth) {
      this..push('/login')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('auth')
      this..push('/')
    }
  }
}
</script>
