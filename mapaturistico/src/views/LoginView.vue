<template>
  <div class="login-page">
    <div class="login-card">
      <div class="lamp-wrap">
        <div class="bulb"></div>
        <div class="light"></div>
      </div>
      <h2>Acceso Administrador</h2>
      <p class="subtitle">Panel de gestión del mapa turístico</p>

      <form @submit.prevent="login" class="login-form" novalidate>
        <div class="field">
          <label>Usuario</label>
          <input
            v-model="username"
            type="text"
            placeholder="Tu usuario"
            autocomplete="username"
            required
          />
        </div>
        <div class="field">
          <label>Contraseña</label>
          <div class="input-wrap">
            <input
              v-model="password"
              :type="showPass ? 'text' : 'password'"
              placeholder="Tu contraseña"
              autocomplete="current-password"
              required
            />
            <button type="button" class="toggle-pass" @click="showPass = !showPass">
              {{ showPass ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <p v-if="error" class="error" role="alert">{{ error }}</p>
        <p v-if="intentos >= 3" class="warning">
          ⚠️ Demasiados intentos fallidos. Verifica tus credenciales.
        </p>

        <button type="submit" class="btn-submit" :disabled="cargando">
          <span v-if="cargando">Entrando…</span>
          <span v-else>Entrar</span>
        </button>
      </form>

      <router-link to="/" class="back-link">← Volver al inicio</router-link>
    </div>
  </div>
</template>

<script>
import { auth } from '../auth/auth.js'

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      showPass: false,
      error: '',
      cargando: false,
      intentos: 0
    }
  },
  methods: {
    async login() {
      this.error = ''
      this.cargando = true
      await new Promise(r => setTimeout(r, 600))

      if (auth.login(this.username, this.password)) {
        this.$router.push('/mapa')
      } else {
        this.intentos++
        this.error = 'Usuario o contraseña incorrectos.'
        this.password = ''
      }
      this.cargando = false
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #0d1b2a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: 'Georgia', serif;
}
.login-card {
  background: #1b263b;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,.5);
  width: 100%;
  max-width: 380px;
  text-align: center;
  color: white;
}
.lamp-wrap { position: relative; margin-bottom: 1.5rem; height: 60px; }
.bulb {
  width: 36px;
  height: 36px;
  background: #ffeb3b;
  border-radius: 50%;
  margin: 0 auto;
  animation: glow 1.5s infinite alternate;
}
.light {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255,235,59,.3) 0%, transparent 70%);
  border-radius: 50%;
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  animation: pulse 2s infinite;
  pointer-events: none;
}
@keyframes glow {
  from { box-shadow: 0 0 8px #ffeb3b; }
  to   { box-shadow: 0 0 28px #ffeb3b, 0 0 60px rgba(255,235,59,.3); }
}
@keyframes pulse {
  from { transform: translateX(-50%) scale(1);   opacity: .6; }
  to   { transform: translateX(-50%) scale(1.25); opacity: .15; }
}
h2 { margin: 0 0 4px; font-size: 1.4rem; font-weight: 400; }
.subtitle { font-size: 13px; color: rgba(255,255,255,.5); margin: 0 0 1.8rem; }

.login-form { text-align: left; }
.field { margin-bottom: 1rem; }
.field label {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: rgba(255,255,255,.5);
  margin-bottom: 5px;
}
.field input, .input-wrap input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  transition: border-color .2s;
}
.field input:focus, .input-wrap input:focus {
  outline: none;
  border-color: rgba(126,232,200,.6);
}
.input-wrap { position: relative; }
.input-wrap input { padding-right: 40px; }
.toggle-pass {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
}

.error {
  background: rgba(220,50,50,.15);
  border: 1px solid rgba(220,50,50,.3);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  color: #ff7b7b;
  margin: 4px 0 12px;
}
.warning {
  font-size: 12px;
  color: #ffcc66;
  margin: 0 0 12px;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background: #7ee8c8;
  color: #0a4f6e;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity .2s, transform .1s;
  margin-top: 4px;
}
.btn-submit:hover:not(:disabled) { opacity: .9; transform: translateY(-1px); }
.btn-submit:disabled { opacity: .5; cursor: not-allowed; }

.back-link {
  display: block;
  margin-top: 1.5rem;
  font-size: 13px;
  color: rgba(255,255,255,.4);
  text-decoration: none;
  transition: color .2s;
}
.back-link:hover { color: rgba(255,255,255,.7); }
</style>
