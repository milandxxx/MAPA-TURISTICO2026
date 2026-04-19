import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

// REQUEST
api.interceptors.request.use(config => {
  return config
})

// RESPONSE
api.interceptors.response.use(
  res => res,
  err => {
    console.error('API ERROR:', err.response?.data || err.message)
    return Promise.reject(err)
  }
)

export default api