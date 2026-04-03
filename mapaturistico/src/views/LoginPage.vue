<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const user = ref("")
const pass = ref("")
const error = ref(false)
const router = useRouter()

const login = () => {
  if (user.value === "admin" && pass.value === "1234") {
    localStorage.setItem("auth", "true")
    router.push("/admin")
  } else {
    error.value = true
  }
}
</script>

<template>
  <div>
    <input v-model="user" placeholder="Usuario" />
    <input v-model="pass" type="password" placeholder="Contraseña" />
    <button @click="login">Entrar</button>

    <p v-if="error">Credenciales incorrectas</p>
  </div>
</template>
