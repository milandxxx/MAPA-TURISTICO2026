import axios from 'axios'

export const toggleFav = async (l) => {
  const res = await axios.put(`http://127.0.0.1:8000/lugares/${l.id}/fav`)
  l.favorito = res.data.favorito
}
