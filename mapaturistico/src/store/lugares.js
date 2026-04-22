import axios from 'axios'
const API = 'http://127.0.0.1:8000'

export default {
  getLugares() {
    return axios.get(\\/lugares\).then(r => r.data)
  },
  createLugar(data) {
    return axios.post(\\/lugares\, data)
  },
  updateLugar(id, data) {
    return axios.put(\\/lugares/\\, data)
  },
  deleteLugar(id) {
    return axios.delete(\\/lugares/\\)
  },
  toggleFav(id) {
    return axios.put(\\/lugares/\/fav\)
  }
}
