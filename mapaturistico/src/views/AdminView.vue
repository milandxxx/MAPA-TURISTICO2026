<template>
  <div>
    <h2>Admin</h2>
    <button @click="logout">Salir</button>
  </div>
</template>

<script setup>
const logout = () => {
  localStorage.removeItem('auth')
  location.href='/'
}
</script>
