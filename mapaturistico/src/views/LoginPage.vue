<template>

  <section class="login-container">
    
      Caja del formulario.
      Aquí se aplica el efecto visual (glass/oscuro + sombra).
    -->
    <div class="login-box">

      <h2>Login</h2>

      <form @submit.prevent="login">

        <div class="input-box">
          <input type="text" required v-model="user" />
          <label>Usuario</label>
        </div>

        <div class="input-box">
          <input :type="show ? 'text' : 'password'" required v-model="pass" />
          <label>Contraseña</label>

          
          <span class="toggle" @click="show = !show">
            {{ show ? 'Ocultar' : 'Ver' }}
          </span>
        </div>
        <button type="submit">Ingresar</button>

      </form>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref('')
const pass = ref('')
const show = ref(false)

/*
  Instancia del router para navegación programática
*/
const router = useRouter()

/*
  cuidado al tocar esta función, es la que valida el login.
  Actualmente solo acepta "admin" y "1234" como credenciales válidas.
  Si el login es exitoso, se guarda un flag en localStorage y se redir
*/
const login = () => {
  if (user.value === 'admin' && pass.value === '1234') {
    localStorage.setItem('auth', 'true')
    router.push('/admin')
  } else {
    alert('Credenciales incorrectas')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background: linear-gradient(45deg, #0f2027, #2c5364);
  animation: gradientMove 6s infinite alternate;
}
@keyframes gradientMove {
  0% { background: linear-gradient(45deg, #0f2027, #2c5364); }
  100% { background: linear-gradient(45deg, #1c92d2, #f2fcfe); }
}
.login-box {
  width: 350px;
  padding: 40px;

  background: rgba(0,0,0,0.6);
  border-radius: 15px;
  box-shadow: 0 0 30px rgba(0,0,0,0.5);

  color: white;
}
.input-box {
  position: relative;
  margin-bottom: 30px;
}
.input-box input {
  width: 100%;
  padding: 10px 0;

  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;

  outline: none;
  color: white;
}
.input-box label {
  position: absolute;
  top: 10px;
  left: 0;

  transition: 0.3s;
  pointer-events: none;
}
.input-box input:focus ~ label,
.input-box input:valid ~ label {
  top: -15px;
  font-size: 12px;
  color: #03e9f4;
}
button {
  width: 100%;
  padding: 10px;

  background: #03e9f4;
  border: none;
  border-radius: 5px;

  cursor: pointer;
}
.toggle {
  position: absolute;
  right: 0;
  top: 10px;

  cursor: pointer;
  font-size: 12px;
}
</style>