import axios from 'axios'

const API = 'http://localhost:8000'

export const getLugares = async () =>
  (await axios.get(${API}/lugares)).data

export const createLugar = async (data) =>
  await axios.post(${API}/lugares, data)

export const updateLugar = async (id, data) =>
  await axios.put(${API}/lugares/, data)

export const deleteLugar = async (id) =>
  await axios.delete(${API}/lugares/)

export const getCategorias = async () =>
  (await axios.get(${API}/categorias)).data
