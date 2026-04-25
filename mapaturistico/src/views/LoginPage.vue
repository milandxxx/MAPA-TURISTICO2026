<template>
  <div class="login">
    <h2>🔐 Login</h2>
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
.login {
  max-width:350px;
  margin:50px auto;
  padding:30px;
  background:#fff;
  border-radius:12px;
  box-shadow:0 4px 12px rgba(0,0,0,0.1);
  text-align:center;
}
.login h2 {
  margin-bottom:20px;
  color:#007BFF;
}
.login input {
  display:block;
  width:100%;
  margin:15px 0;
  padding:10px;
  border:1px solid #ccc;
  border-radius:6px;
}
.login input:focus {
  border-color:#007BFF;
  outline:none;
}
.login button {
  width:100%;
  padding:12px;
  background:#007BFF;
  color:#fff;
  border:none;
  border-radius:6px;
  cursor:pointer;
  font-weight:bold;
  transition:0.3s;
}
.login button:hover {
  background:#0056b3;
}
</style>
