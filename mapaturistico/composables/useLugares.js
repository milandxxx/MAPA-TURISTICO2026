import { ref } from 'vue'
import * as service from '../services/lugares'

export default function useLugares() {
  const lugares = ref([])
  const loading = ref(false)
  const error = ref(null)

  const handle = async (fn) => {
    try {
      loading.value = true
      error.value = null
      await fn()
    } catch (e) {
      error.value = 'Error en la operación'
    } finally {
      loading.value = false
    }
  }

  const load = (params = {}) =>
    handle(async () => {
      const res = await service.getLugares(params)
      lugares.value = res.data
    })

  const create = (data) =>
    handle(async () => {
      await service.createLugar(data)
      await load()
    })

  const update = (id, data) =>
    handle(async () => {
      await service.updateLugar(id, data)
      await load()
    })

  const remove = (id) =>
    handle(async () => {
      await service.deleteLugar(id)
      await load()
    })

  const fav = (id) =>
    handle(async () => {
      await service.toggleFav(id)
      await load()
    })

  return {
    lugares,
    loading,
    error,
    load,
    create,
    update,
    remove,
    fav
  }
}