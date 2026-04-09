<template>
<div>
<h2>Admin</h2>
<button @click='logout'>Salir</button>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const r=useRouter()
const logout=()=>{
localStorage.removeItem('auth')
r.push('/')
}
</script>
