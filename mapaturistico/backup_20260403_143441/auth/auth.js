// Módulo de autenticación
// En producción real, esto se haría contra un backend con JWT.
// Para este proyecto académico: credenciales en variable de entorno o config separada.
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'samarta2026'  // movido fuera del componente

export const auth = {
  login(username, password) {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem('isAdmin', 'true')  // sessionStorage: se borra al cerrar pestaña
      return true
    }
    return false
  },

  logout() {
    sessionStorage.removeItem('isAdmin')
  },

  isAdmin() {
    return sessionStorage.getItem('isAdmin') === 'true'
  }
}
