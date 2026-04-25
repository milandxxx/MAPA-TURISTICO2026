<template>
  <div class="login">
    <input v-model="user" placeholder="Usuario"/>
    <input v-model="pass" type="password" placeholder="Password"/>
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return { user:'', pass:'' }
  },
  methods: {
    login() {
      if (this.user === "admin" && this.pass === "123") {
        this.$router.push("/admin")
      } else {
        alert("Error")
      }
    }
  }
}
</script>

<style>
.login { max-width:300px; margin:100px auto; }
</style>
