<template>
<div class="container">
  <div class="cord" @click="toggle"></div>
  <div class="bulb" :class="{on: encendido}"></div>
  <div class="light" :class="{on: encendido}"></div>

  <div class="login" v-if="encendido">
    <input v-model="user" placeholder="usuario"/>
    <input v-model="pass" type="password" placeholder="password"/>
    <button @click="login">Entrar</button>
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

const toggle = () => encendido.value = !encendido.value

const login = () => {
  if (user.value === 'admin' && pass.value === '1234') {
    localStorage.setItem('auth','1')
    router.push('/admin')
  }
}
</script>

<style>
.container { height:100vh; background:#020617; display:flex; justify-content:center; align-items:center; }
.cord { width:4px; height:100px; background:#aaa; cursor:pointer; position:absolute; top:0; }
.bulb { width:40px; height:40px; background:#444; border-radius:50%; position:absolute; top:100px; }
.bulb.on { background:#fde047; box-shadow:0 0 30px #fde047; }
.light { position:absolute; width:400px; height:400px; opacity:0; clip-path:circle(0% at 50% 0%); background:radial-gradient(circle, rgba(255,255,200,0.4), transparent 70%); }
.light.on { opacity:1; clip-path:circle(60% at 50% 0%); }
.login { background:white; padding:20px; border-radius:10px; display:flex; flex-direction:column; gap:10px; }
</style>
