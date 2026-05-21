<template>

<div>

  <h1>Admin Panel</h1>

  <button @click="logout">
    Cerrar sesión
  </button>

</div>

</template>

<script>

export default {

  methods:{

    logout(){

      localStorage.removeItem('token')

      this.$router.push('/login')

    }

  }

}

</script>