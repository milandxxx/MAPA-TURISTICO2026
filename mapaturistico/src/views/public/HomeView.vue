<template>

<div class="home">

    <div class="overlay">

        <div class="navbar">

            <h1 class="logo">
                MAPA TURÍSTICO
            </h1>

            <button
                class="login-btn"
                @click="$router.push('/login')"
            >
                Admin
            </button>

        </div>

        <div class="hero">

            <h1 class="titulo">
                Explora lugares increíbles
            </h1>

            <p class="subtitulo">
                Vive una experiencia tipo Google Maps
            </p>

            <div class="busqueda">

                <input
                    v-model="busqueda"
                    placeholder="Buscar lugar..."
                />

                <button @click="buscar">
                    Buscar
                </button>

            </div>

        </div>

    </div>

</div>

</template>

<script>

export default {

data(){

    return{

        busqueda:''

    }

},

methods:{

    buscar(){

        if(this.busqueda !== ''){

            this.$router.push('/mapa/1')

        }

    }

}

}

</script>

<style scoped>

.home{

    width:100%;
    height:100vh;

    background-image:url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e');

    background-size:cover;
    background-position:center;

    position:relative;

    overflow:hidden;

}

.overlay{

    width:100%;
    height:100%;

    background:rgba(0,0,0,0.55);

    backdrop-filter:blur(3px);

}

.navbar{

    display:flex;

    justify-content:space-between;
    align-items:center;

    padding:20px 50px;

}

.logo{

    color:white;

    font-size:32px;

    font-weight:bold;

}

.login-btn{

    padding:12px 25px;

    border:none;

    border-radius:30px;

    background:#00b894;

    color:white;

    cursor:pointer;

    font-size:16px;

    transition:0.3s;

}

.login-btn:hover{

    transform:scale(1.05);

}

.hero{

    width:100%;
    height:80%;

    display:flex;

    flex-direction:column;

    justify-content:center;
    align-items:center;

    animation:fade 1.5s ease;

}

.titulo{

    color:white;

    font-size:70px;

    font-weight:bold;

    margin-bottom:15px;

}

.subtitulo{

    color:white;

    font-size:22px;

    margin-bottom:30px;

}

.busqueda{

    display:flex;

    gap:15px;

}

.busqueda input{

    width:400px;

    padding:18px;

    border:none;

    border-radius:40px;

    outline:none;

    font-size:18px;

}

.busqueda button{

    padding:18px 30px;

    border:none;

    border-radius:40px;

    background:#0984e3;

    color:white;

    font-size:17px;

    cursor:pointer;

    transition:0.3s;

}

.busqueda button:hover{

    transform:scale(1.05);

}

@keyframes fade{

    from{

        opacity:0;
        transform:translateY(40px);

    }

    to{

        opacity:1;
        transform:translateY(0);

    }

}

</style>