<template>
  <div class="login-page">
    <div class="lamp">
      <div class="lamp-light" :class="{ active: mostrarLogin }"></div>
      <button class="lamp-rope" @click="toggleLogin">
        🪢 Tirar cuerda
      </button>
    </div>
    <transition name="fade-slide">
      <div v-if="mostrarLogin" class="login-form">
        <h2>Acceso Administrador</h2>
        <p>Panel de gestión del mapa turístico</p>
        <input type="text" placeholder="Usuario" v-model="usuario" />
        <input type="password" placeholder="Contraseña" v-model="contrasena" />
        <button @click="entrar">Entrar</button>
        <router-link to="/" class="volver">← Volver al inicio</router-link>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      mostrarLogin: false,
      usuario: "",
      contrasena: ""
    }
  },
  methods: {
    toggleLogin() {
      this.mostrarLogin = !this.mostrarLogin
    },
    entrar() {
if (this.usuario === "admin" && this.contrasena === "1234") {
  localStorage.setItem("isAdmin", "true")
  this.$router.push("/admin")
}

    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(180deg, #111 0%, #222 100%);
  color: white;
  font-family: 'Roboto', Arial, sans-serif;
}
.lamp {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.lamp-light {
  width: 60px;
  height: 60px;
  background: #555;
  border-radius: 50%;
  box-shadow: 0 0 10px #333;
  transition: all 0.4s ease-in-out;
}
.lamp-light.active {
  background: yellow;
  box-shadow: 0 0 25px yellow, 0 0 50px rgba(255,255,0,0.6);
}
.lamp-rope {
  margin-top: 10px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s ease-in-out;
}
.lamp-rope:hover { color: #ffd700; }
.login-form {
  background: #1e1e1e;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(255,255,0,0.6);
  text-align: center;
  width: 280px;
  animation: popIn 0.4s ease-in-out;
}
.login-form h2 { margin-bottom: 8px; color: #ffd700; }
.login-form p { margin-bottom: 16px; font-size: 14px; color: #ccc; }
.login-form input {
  display: block;
  margin: 10px auto;
  padding: 8px;
  border-radius: 6px;
  border: none;
  width: 90%;
  background: #333;
  color: white;
  transition: box-shadow 0.2s ease-in-out;
}
.login-form input:focus {
  outline: none;
  box-shadow: 0 0 6px rgba(255,215,0,0.8);
}
.login-form button {
  margin-top: 10px;
  padding: 8px 16px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}
.login-form button:hover { background: #145a9c; }
.volver {
  display: block;
  margin-top: 12px;
  color: #bbb;
  text-decoration: none;
  font-size: 13px;
}
.volver:hover { color: #ffd700; }
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.4s ease; }
.fade-slide-enter { opacity: 0; transform: translateY(-20px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-20px); }
@keyframes popIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
