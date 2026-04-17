<template>
<div class='container'>
<input v-model='form.nombre'/>
<input v-model='form.descripcion'/>
<input v-model='form.precio'/>
<button @click='guardar'>Guardar</button>
<ul>
<li v-for='l in lugares' :key='l.id'>
{{ l.nombre }}
<button @click='editar(l)'>Editar</button>
<button @click='eliminar(l.id)'>Eliminar</button>
</li>
</ul>
</div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { getLugares,createLugar,updateLugar,deleteLugar } from '../store/lugares'

const lugares = ref([])
const form = ref({id:null,nombre:'',descripcion:'',precio:0})

onMounted(async()=>lugares.value=await getLugares())

const guardar = async()=>{
if(form.value.id) await updateLugar(form.value.id,form.value)
else await createLugar(form.value)
lugares.value = await getLugares()
}

const editar = l=>form.value={...l}
const eliminar = async id=>{
await deleteLugar(id)
lugares.value = await getLugares()
}
</script>
