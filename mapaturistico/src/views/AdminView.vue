<template>
  <div>
    <h2>Admin</h2>
    <input v-model='nuevo.nombre' placeholder='Nombre'/>
    <button @click='crear'>Agregar</button>

    <ul>
      <li v-for='l in lugares' :key='l.id'>
        {{ l.nombre }}
        <button @click='eliminar(l.id)'>X</button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  data(){ return { lugares:[], nuevo:{} }},
  mounted(){ this.cargar() },
  methods:{
    cargar(){ api.get('/lugares').then(r=>this.lugares=r.data) },
    crear(){ api.post('/lugares', this.nuevo).then(()=>this.cargar()) },
    eliminar(id){ api.delete('/lugares/'+id).then(()=>this.cargar()) }
  }
}
</script>

<style></style>
