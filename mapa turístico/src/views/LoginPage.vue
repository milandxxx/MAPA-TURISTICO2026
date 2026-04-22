<template>
  <div class="login">
    <h2>Login</h2>
    <input type="text" placeholder="Usuario" v-model="user"/>
    <input type="password" placeholder="Contraseña" v-model="pass"/>
    <button @click="login">Ingresar</button>
  </div>
</template>

<script>
export default {
  name:"LoginPage",
  data(){return{user:"",pass:""}},
  methods:{
    login(){
      if(this.user && this.pass){
        alert("Login exitoso")
      } else {
        alert("Completa los campos")
      }
    }
  }
}
</script>

<style>
.login { max-width:300px; margin:50px auto; padding:20px; background:#fff; border-radius:8px; box-shadow:0 0 10px #ccc; }
.login input { display:block; width:100%; margin:10px 0; padding:8px; }
.login button { width:100%; padding:10px; background:#007BFF; color:#fff; border:none; border-radius:4px; cursor:pointer; }
.login button:hover { background:#0056b3; }
</style>
