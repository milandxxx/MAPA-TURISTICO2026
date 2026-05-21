import axios from 'axios'

const API = 'http://127.0.0.1:8000'

export const login = (data)=>{

  return axios.post(
    `${API}/login`,
    data
  )

}