<template>
<div>
<div @click='encendido=!encendido'>Interruptor</div>
<div v-show='encendido'>
<input v-model='user'/>
<input v-model='pass' type='password'/>
<button @click='login'>Entrar</button>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const encendido = ref(false)
const user = ref('')
const pass = ref('')

const login=()=>{
if(user.value==='admin' && pass.value==='1234'){
localStorage.setItem('auth','1')
router.push('/admin')
}
}
</script>
