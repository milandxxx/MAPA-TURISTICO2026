<template>
<div class='login-bg'>
<div class='login-card'>
<input v-model='user' placeholder='Usuario'/>
<input v-model='pass' type='password' placeholder='Contraseña'/>
<button @click='login'>Entrar</button>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref('')
const pass = ref('')
const router = useRouter()

const login = ()=>{
localStorage.setItem('user',user.value)
if(user.value==='admin'&&pass.value==='1234'){
localStorage.setItem('auth',true)
router.push('/admin')
}else{
router.push('/')
}
}
</script>
