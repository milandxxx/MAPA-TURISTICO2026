<template>

<div class="login-page">

    <div class="background"></div>

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

<style scoped>

.login-page{

    width:100%;
    height:100vh;

    display:flex;

    justify-content:center;
    align-items:center;

    overflow:hidden;

    position:relative;

    background:#0f172a;

}

.background{

    position:absolute;

    width:200%;
    height:200%;

    background:

    radial-gradient(circle,#00cec9 2px,transparent 2px);

    background-size:50px 50px;

    animation:mover 15s linear infinite;

    opacity:0.25;

}

.card{

    position:relative;

    z-index:10;

    width:400px;

    padding:40px;

    border-radius:25px;

    background:rgba(255,255,255,0.08);

    backdrop-filter:blur(15px);

    border:1px solid rgba(255,255,255,0.15);

    display:flex;

    flex-direction:column;

    gap:20px;

    animation:subir 1s ease;

}

.card h1{

    color:white;

    text-align:center;

    margin-bottom:10px;

}

.card input{

    padding:16px;

    border:none;

    border-radius:15px;

    outline:none;

    background:rgba(255,255,255,0.15);

    color:white;

    font-size:16px;

}

.card input::placeholder{

    color:#dfe6e9;

}

.card button{

    padding:16px;

    border:none;

    border-radius:15px;

    background:#00b894;

    color:white;

    font-size:17px;

    cursor:pointer;

    transition:0.3s;

}

.card button:hover{

    transform:scale(1.03);

}

@keyframes mover{

    from{

        transform:translate(0,0);

    }

    to{

        transform:translate(-200px,-200px);

    }

}

@keyframes subir{

    from{

        opacity:0;
        transform:translateY(50px);

    }

    to{

        opacity:1;
        transform:translateY(0);

    }

}

</style>