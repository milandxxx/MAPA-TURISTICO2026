<template>
<div>
<input v-model='u'/>
<input v-model='p' type='password'/>
<button @click='login'>Entrar</button>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const u=ref(''),p=ref('')
const r=useRouter()
const login=()=>{
if(u.value==='admin'&&p.value==='1234'){
localStorage.setItem('auth','true')
r.push('/admin')
}
}
</script>
