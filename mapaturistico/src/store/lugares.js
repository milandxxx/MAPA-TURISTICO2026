import api from './api'

export const getLugares = (params = {}) =>
  api.get('/lugares', { params })

export const createLugar = (data) =>
  api.post('/lugares', data)

export const updateLugar = (id, data) =>
  api.put(`/lugares/${id}`, data)

export const deleteLugar = (id) =>
  api.delete(`/lugares/${id}`)

export const toggleFav = (id) =>
  api.put(`/lugares/${id}/fav`)