<template>

<div class="login-container">

    <div class="login-box">

        <h1>Admin Login</h1>

        <input
            v-model="username"
            type="text"
            placeholder="Usuario"
        >

        <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
        >

        <button @click="login">
            Ingresar
        </button>

    </div>

</div>

</template>

<script>

import authService from "../services/authService";

export default {

    name:"LoginView",

    data(){

        return{

            username:"",
            password:""

        }

    },

    methods:{

        async login(){

            try{

                const response = await authService.login({

                    username:this.username,
                    password:this.password

                })

                console.log(response.data)

                localStorage.setItem(
                    "token",
                    "logueado"
                )

                alert("Login correcto")

                this.$router.push("/admin")

            }
            catch(error){

                console.log(error)

                alert("Credenciales incorrectas")

            }

        }

    }

}

</script>

<style scoped>

.login-container{

    width:100%;
    height:100vh;

    display:flex;

    justify-content:center;
    align-items:center;

    background:#f3f4f6;

}

.login-box{

    width:350px;

    background:white;

    padding:30px;

    border-radius:20px;

    display:flex;

    flex-direction:column;

    gap:15px;

    box-shadow:0 10px 30px rgba(0,0,0,0.1);

}

h1{

    text-align:center;

}

input{

    padding:12px;

    border:1px solid #ccc;

    border-radius:10px;

}

button{

    padding:12px;

    border:none;

    border-radius:10px;

    background:#2563eb;

    color:white;

    cursor:pointer;

}

</style>