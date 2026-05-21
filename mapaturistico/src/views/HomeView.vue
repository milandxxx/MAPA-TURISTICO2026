<template>

<div class="home">

    <div class="overlay">

        <h1>
            MAPA TURÍSTICO
        </h1>

        <p>
            Explora lugares turísticos de manera interactiva
        </p>

        <router-link to="/mapa">

            <button>
                Ir al mapa
            </button>

        </router-link>

    </div>

</div>

</template>

<script>

export default {

    name:'HomeView'

}

</script>

<style scoped>

.home{

    width:100%;

    height:100vh;

    background-image:url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e');

    background-size:cover;

    background-position:center;

    display:flex;

    justify-content:center;

    align-items:center;

}

.overlay{

    background:rgba(0,0,0,0.6);

    padding:50px;

    border-radius:20px;

    text-align:center;

    color:white;

}

h1{

    font-size:60px;

}

p{

    margin-top:15px;

    font-size:20px;

}

button{

    margin-top:30px;

    padding:15px 30px;

    border:none;

    border-radius:12px;

    background:#2563eb;

    color:white;

    cursor:pointer;

    font-size:18px;

}

</style>