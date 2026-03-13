<template>
  <div class="login-container">
    <div class="lamp">
      <div class="bulb"></div>
      <div class="light"></div>
    </div>
    <form @submit.prevent="login" class="login-form">
      <h2>Acceso Administrador</h2>
      <input v-model="username" type="text" placeholder="Usuario" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return { username: '', password: '', error: '' }
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === '1234') {
        localStorage.setItem('isAdmin', 'true')
        this.$router.push('/')
      } else {
        this.error = 'Credenciales inválidas'
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #0d1b2a;
  color: white;
  font-family: Arial, sans-serif;
}

/* Animación lámpara */
.lamp {
  position: relative;
  margin-bottom: 2rem;
}
.bulb {
  width: 40px;
  height: 40px;
  background: #ffeb3b;
  border-radius: 50%;
  margin: auto;
  animation: glow 1.5s infinite alternate;
}
.light {
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255,235,59,0.4) 0%, transparent 70%);
  border-radius: 50%;
  position: absolute;
  top: -40px;
  left: -40px;
  animation: pulse 2s infinite;
}
@keyframes glow {
  from { box-shadow: 0 0 10px #ffeb3b; }
  to { box-shadow: 0 0 30px #ffeb3b; }
}
@keyframes pulse {
  from { transform: scale(1); opacity: 0.6; }
  to { transform: scale(1.2); opacity: 0.2; }
}

/* Formulario */
.login-form {
  background: #1b263b;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
  text-align: center;
}
.login-form h2 {
  margin-bottom: 1rem;
}
.login-form input {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
}
.login-form button {
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background: #0072ff;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}
.login-form button:hover {
  background: #0056b3;
}
.error {
  margin-top: 1rem;
  color: #ff3b3b;
}
</style>