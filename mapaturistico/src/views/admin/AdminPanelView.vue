<template>

<div class="admin">

    <h1>Admin Panel</h1>

    <div class="formulario">

        <input
            v-model="form.nombre"
            placeholder="Nombre"
        />

        <textarea
            v-model="form.descripcion"
            placeholder="Descripción"
        ></textarea>

        <input
            v-model="form.imagen"
            placeholder="URL imagen"
        />

        <input
            type="number"
            v-model="form.latitud"
            placeholder="Latitud"
        />

        <input
            type="number"
            v-model="form.longitud"
            placeholder="Longitud"
        />

        <select v-model="form.abierto">

            <option :value="true">
                Abierto
            </option>

            <option :value="false">
                Cerrado
            </option>

        </select>

        <button
            v-if="editando"
            @click="actualizar"
        >
            Actualizar
        </button>

        <button
            v-else
            @click="guardar"
        >
            Crear
        </button>

    </div>

    <div
        class="card"
        v-for="lugar in lugares"
        :key="lugar.id"
    >

        <img :src="lugar.imagen" />

        <h2>
            {{ lugar.nombre }}
        </h2>

        <p>
            {{ lugar.descripcion }}
        </p>

        <button @click="editar(lugar)">
            Editar
        </button>

        <button @click="eliminar(lugar.id)">
            Eliminar
        </button>

    </div>

</div>

</template>

<script>

import axios from 'axios'

export default {

data(){

    return{

        lugares:[],

        editando:false,

        lugarId:null,

        form:{

            nombre:'',
            descripcion:'',
            imagen:'',
            latitud:'',
            longitud:'',
            abierto:true

        }

    }

},

methods:{

    cargar(){

        axios.get(
            'http://127.0.0.1:8000/lugares'
        )

        .then((response)=>{

            this.lugares = response.data

        })

    },

    guardar(){

        axios.post(
            'http://127.0.0.1:8000/lugares',

            this.form,

            {

                headers:{

                    Authorization:`Bearer ${localStorage.getItem('token')}`

                }

            }

        )

        .then(()=>{

            this.limpiar()

            this.cargar()

        })

    },

    editar(lugar){

        this.editando = true

        this.lugarId = lugar.id

        this.form = {

            nombre:lugar.nombre,
            descripcion:lugar.descripcion,
            imagen:lugar.imagen,
            latitud:lugar.latitud,
            longitud:lugar.longitud,
            abierto:lugar.abierto

        }

    },

    actualizar(){

        axios.put(

            `http://127.0.0.1:8000/lugares/${this.lugarId}`,

            this.form,

            {

                headers:{

                    Authorization:`Bearer ${localStorage.getItem('token')}`

                }

            }

        )

        .then(()=>{

            this.editando = false

            this.limpiar()

            this.cargar()

        })

    },

    eliminar(id){

        axios.delete(

            `http://127.0.0.1:8000/lugares/${id}`,

            {

                headers:{

                    Authorization:`Bearer ${localStorage.getItem('token')}`

                }

            }

        )

        .then(()=>{

            this.cargar()

        })

    },

    limpiar(){

        this.form = {

            nombre:'',
            descripcion:'',
            imagen:'',
            latitud:'',
            longitud:'',
            abierto:true

        }

    }

},

mounted(){

    this.cargar()

}

}

</script>

<style scoped>

.admin{

    padding:30px;

    background:#111827;

    min-height:100vh;

    color:white;

}

.formulario{

    display:flex;

    flex-direction:column;

    gap:15px;

    background:#1f2937;

    padding:20px;

    border-radius:15px;

    margin-bottom:30px;

}

input,
textarea,
select{

    padding:14px;

    border:none;

    border-radius:10px;

}

button{

    padding:14px;

    border:none;

    border-radius:10px;

    cursor:pointer;

}

.card{

    background:#1f2937;

    padding:20px;

    border-radius:15px;

    margin-bottom:20px;

}

.card img{

    width:100%;

    height:250px;

    object-fit:cover;

    border-radius:10px;

}

</style>