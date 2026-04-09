<template>
<div>
<input v-model='nombre'/>
<button @click='crear'>Crear</button>

<div v-for='l in lugares' :key='l.id'>
{{l.nombre}} <button @click='eliminar(l.id)'>X</button>
</div>
</div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import axios from 'axios'
import { useLugares } from '../store/lugaresStore'

const { lugares,cargar } = useLugares()
const nombre = ref('')
onMounted(cargar)

const crear = async()=>{
await axios.post('http://127.0.0.1:8000/lugares',{nombre})
cargar()
}

const eliminar = async(id)=>{
await axios.delete(http://127.0.0.1:8000/lugares/)
cargar()
}
</script>
