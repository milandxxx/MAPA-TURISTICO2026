import axios from 'axios'
const API = 'http://localhost:8000'

export const getFavoritos = async () => {
  const user = localStorage.getItem('user')
  const res = await axios.get(${API}/favoritos/)
  return res.data
}

export const toggleFavorito = async (lugarId) => {
  const user = localStorage.getItem('user')
  await axios.post(${API}/favoritos, {
    usuario: user,
    lugar_id: lugarId
  })
}
