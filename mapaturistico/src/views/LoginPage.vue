<template>
  <div class="container">

    <div class="login-box">
      <h2>Iniciar Sesión</h2>

      <form @submit.prevent="login">

        <div class="input-box">
          <input type="text" v-model="user" required />
          <label>Usuario</label>
        </div>

        <div class="input-box">
          <input type="password" v-model="pass" required />
          <label>Contraseña</label>
        </div>

        <button type="submit">Entrar</button>

      </form>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      pass: ''
    }
  },

  methods: {
    login() {
      const form = this.$el.querySelector('form')

      form.style.transform = "scale(0.95)"

      setTimeout(() => {
        form.style.transform = "scale(1)"

        if (this.user === 'admin' && this.pass === '123') {
          localStorage.setItem('auth', 'true')
          this.$router.push('/admin')
        } else {
          alert('Credenciales incorrectas')
        }

      }, 150)
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
}

.login-box {
  width: 320px;
  padding: 40px;
  background: rgba(0,0,0,0.5);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  color: white;
}

.input-box {
  position: relative;
  margin-bottom: 25px;
}

.input-box input {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  color: white;
}

.input-box label {
  position: absolute;
  top: 10px;
  left: 0;
  transition: .3s;
}

.input-box input:focus ~ label,
.input-box input:valid ~ label {
  top: -15px;
  font-size: 12px;
  color: cyan;
}

button {
  width: 100%;
  padding: 10px;
  background: cyan;
  border: none;
  cursor: pointer;
}
</style>