<template>

<div class="contenedor">

    <div class="sidebar">

        <div class="top">

            <h1>
                MAPA TURÍSTICO
            </h1>

            <input
                v-model="busqueda"
                placeholder="Buscar lugar..."
            />

        </div>

        <div
            class="lugares"
            v-if="lugaresFiltrados.length > 0"
        >

            <div
                class="card"
                v-for="lugar in lugaresFiltrados"
                :key="lugar.id"
                @click="seleccionarLugar(lugar)"
            >

                <img
                    :src="lugar.imagen"
                    alt=""
                />

                <div class="info">

                    <h2>
                        {{ lugar.nombre }}
                    </h2>

                    <p>
                        {{ lugar.descripcion }}
                    </p>

                    <span
                        v-if="lugar.abierto"
                        class="abierto"
                    >
                        Abierto
                    </span>

                    <span
                        v-else
                        class="cerrado"
                    >
                        Cerrado
                    </span>

                </div>

            </div>

        </div>

        <div
            v-else
            class="vacio"
        >

            No se encontraron lugares

        </div>

    </div>

    <div
        id="map"
        class="mapa"
    ></div>

</div>

</template>

<script>

import 'ol/ol.css'

import Map from 'ol/Map'

import View from 'ol/View'

import TileLayer from 'ol/layer/Tile'

import OSM from 'ol/source/OSM'

import VectorSource from 'ol/source/Vector'

import VectorLayer from 'ol/layer/Vector'

import Feature from 'ol/Feature'

import Point from 'ol/geom/Point'

import { fromLonLat } from 'ol/proj'

import { Icon, Style } from 'ol/style'

import axios from 'axios'

export default {

data(){

    return{

        map:null,

        vectorSource:null,

        lugares:[],

        busqueda:'',

        lugarSeleccionado:null

    }

},

computed:{

    lugaresFiltrados(){

        return this.lugares.filter((lugar)=>{

            return lugar.nombre
            .toLowerCase()
            .includes(
                this.busqueda.toLowerCase()
            )

        })

    }

},

methods:{

    cargarMapa(){

        this.vectorSource = new VectorSource()

        const vectorLayer = new VectorLayer({

            source:this.vectorSource

        })

        this.map = new Map({

            target:'map',

            layers:[

                new TileLayer({

                    source:new OSM()

                }),

                vectorLayer

            ],

            view:new View({

                center:fromLonLat([
                    -74.1990,
                    11.2408
                ]),

                zoom:13

            })

        })

    },

    obtenerLugares(){

        axios.get(
            'http://127.0.0.1:8000/lugares'
        )

        .then((response)=>{

            this.lugares = response.data

            this.agregarMarcadores()

        })

        .catch((error)=>{

            console.log(error)

        })

    },

    agregarMarcadores(){

        this.vectorSource.clear()

        this.lugaresFiltrados.forEach((lugar)=>{

            const marcador = new Feature({

                geometry:new Point(

                    fromLonLat([
                        lugar.longitud,
                        lugar.latitud
                    ])

                )

            })

            marcador.setStyle(

                new Style({

                    image:new Icon({

                        anchor:[0.5,1],

                        src:'https://cdn-icons-png.flaticon.com/512/684/684908.png',

                        scale:0.06

                    })

                })

            )

            marcador.set('lugar',lugar)

            this.vectorSource.addFeature(
                marcador
            )

        })

    },

    seleccionarLugar(lugar){

        this.lugarSeleccionado = lugar

        this.vectorSource.clear()

        const marcador = new Feature({

            geometry:new Point(

                fromLonLat([
                    lugar.longitud,
                    lugar.latitud
                ])

            )

        })

        marcador.setStyle(

            new Style({

                image:new Icon({

                    anchor:[0.5,1],

                    src:'https://cdn-icons-png.flaticon.com/512/684/684908.png',

                    scale:0.08

                })

            })

        )

        this.vectorSource.addFeature(
            marcador
        )

        this.map.getView().animate({

            center:fromLonLat([
                lugar.longitud,
                lugar.latitud
            ]),

            zoom:17,

            duration:1500

        })

    }

},

watch:{

    busqueda(){

        this.agregarMarcadores()

    }

},

mounted(){

    this.cargarMapa()

    this.obtenerLugares()

}

}

</script>

<style scoped>

.contenedor{

    width:100%;
    height:100vh;

    display:flex;

    overflow:hidden;

}

.sidebar{

    width:420px;

    background:white;

    overflow-y:auto;

    box-shadow:0 0 15px rgba(0,0,0,0.2);

    z-index:1000;

}

.top{

    padding:20px;

    background:#0f172a;

    color:white;

    position:sticky;

    top:0;

    z-index:20;

}

.top h1{

    margin-bottom:15px;

}

.top input{

    width:100%;

    padding:15px;

    border:none;

    border-radius:12px;

    outline:none;

    font-size:16px;

}

.lugares{

    padding:15px;

}

.card{

    display:flex;

    gap:15px;

    margin-bottom:20px;

    background:white;

    border-radius:15px;

    overflow:hidden;

    cursor:pointer;

    transition:0.3s;

    box-shadow:0 2px 10px rgba(0,0,0,0.1);

}

.card:hover{

    transform:scale(1.02);

}

.card img{

    width:140px;

    height:120px;

    object-fit:cover;

}

.info{

    padding:10px;

    flex:1;

}

.info h2{

    margin-bottom:8px;

    color:#111827;

}

.info p{

    color:#6b7280;

    font-size:14px;

    margin-bottom:10px;

}

.abierto{

    background:#10b981;

    color:white;

    padding:6px 10px;

    border-radius:10px;

    font-size:12px;

}

.cerrado{

    background:#ef4444;

    color:white;

    padding:6px 10px;

    border-radius:10px;

    font-size:12px;

}

.vacio{

    padding:30px;

    text-align:center;

    color:#6b7280;

}

.mapa{

    flex:1;

    height:100vh;

}

</style>