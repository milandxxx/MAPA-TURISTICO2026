import axios from 'axios'
const API = 'http://127.0.0.1:8000/lugares'

export const toggleFav = (id) =>
  axios.put(`${API}/${id}/fav`)