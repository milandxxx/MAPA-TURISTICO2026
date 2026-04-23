<template>
  <div class="searchbox">
    <input type="text" v-model="query" placeholder="Buscar lugar..."/>
    <button @click="$emit('buscar', query)">Buscar</button>
  </div>
</template>

<script>
export default {
  name:"SearchBox",
  data(){return{query:""}}
}
</script>

<style>
.searchbox { margin:20px 0; display:flex; gap:10px; }
.searchbox input { flex:1; padding:8px; border:1px solid #ccc; border-radius:4px; }
.searchbox button { padding:8px 12px; background:#28a745; color:#fff; border:none; border-radius:4px; cursor:pointer; }
.searchbox button:hover { background:#218838; }
</style>
