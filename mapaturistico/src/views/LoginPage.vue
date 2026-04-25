<template>
  <div class="login-container">

    <!-- ANIMACIÓN TURISTA -->
    <div class="scene">
      <div class="tourist">
        <div class="head"></div>
        <div class="body"></div>
        <div class="bag"></div>
        <div class="map"></div>
      </div>
    </div>

    <!-- FORM -->
    <div class="login-box">
      <h2>Panel Admin</h2>

      <input v-model="user" placeholder="Usuario" />
      <input v-model="pass" type="password" placeholder="Contraseña" />

      <button @click="login">Entrar</button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      pass: ""
    };
  },
  methods: {
    login() {
      if (this.user === "admin" && this.pass === "123") {
        localStorage.setItem("auth", "true");
        this.$router.push("/admin");
      } else {
        alert("Credenciales incorrectas");
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  overflow: hidden;
}

/* ESCENA */
.scene {
  width: 300px;
  height: 300px;
  position: relative;
}

/* TURISTA */
.tourist {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: caminar 3s infinite ease-in-out;
}

/* CABEZA */
.head {
  width: 40px;
  height: 40px;
  background: #f1c27d;
  border-radius: 50%;
  margin: 0 auto;
}

/* CUERPO */
.body {
  width: 50px;
  height: 70px;
  background: #3498db;
  margin: 0 auto;
  border-radius: 10px;
}

/* MOCHILA */
.bag {
  width: 20px;
  height: 40px;
  background: #e67e22;
  position: absolute;
  left: -15px;
  top: 50px;
  border-radius: 5px;
}

/* MAPA */
.map {
  width: 25px;
  height: 20px;
  background: white;
  position: absolute;
  right: -20px;
  top: 60px;
  transform: rotate(-10deg);
}

/* ANIMACIÓN */
@keyframes caminar {
  0% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, -10px); }
  100% { transform: translate(-50%, 0); }
}

/* LOGIN BOX */
.login-box {
  background: rgba(255,255,255,0.95);
  padding: 30px;
  border-radius: 15px;
  width: 300px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.login-box h2 {
  margin-bottom: 15px;
}

input {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #1e8449;
}
</style>