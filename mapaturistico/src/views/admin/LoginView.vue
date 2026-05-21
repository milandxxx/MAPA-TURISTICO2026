<template>

<div class="login">

  <div class="card">

    <h1>Admin Login</h1>

    <input
      v-model="usuario"
      placeholder="Usuario"
    />

    <input
      type="password"
      v-model="password"
      placeholder="Contraseña"
    />

    <button @click="ingresar">
      Ingresar
    </button>

  </div>

</div>

</template>

<script>

import { login } from '../../services/authService'

export default {

  data(){

    return{

      usuario:'',
      password:''

    }

  },

  methods:{

    ingresar(){

      login({
        usuario:this.usuario,
        password:this.password
      })

      .then((response)=>{

        localStorage.setItem(
          'token',
          response.data.token
        )

        this.$router.push('/admin')

      })

    }

  }

}

</script>