import { ref } from 'vue'

const safeLoad = () => {
  try {
    return JSON.parse(localStorage.getItem('lugares')) || []
  } catch {
    return []
  }
}

const lugares = ref(safeLoad())

const persist = () => {
  localStorage.setItem('lugares', JSON.stringify(lugares.value))
}

export const useLugares = () => {

  const validar = (l) => {
    if (!l.nombre || l.nombre.length < 3) return false
    if (!l.precio || l.precio <= 0) return false
    if (isNaN(l.lat) || isNaN(l.lon)) return false
    return true
  }

  const agregar = (lugar) => {
    if (!validar(lugar)) return false

    lugar.id = Date.now()
    lugar.precio = Number(lugar.precio)
    lugar.lat = Number(lugar.lat)
    lugar.lon = Number(lugar.lon)

    lugares.value.push(lugar)
    persist()
    return true
  }

  const eliminar = (id) => {
    lugares.value = lugares.value.filter(l => l.id !== id)
    persist()
  }

  const editar = (lugar) => {
    if (!validar(lugar)) return false

    const i = lugares.value.findIndex(l => l.id === lugar.id)
    if (i !== -1) {
      lugares.value[i] = lugar
      persist()
      return true
    }
    return false
  }

  return { lugares, agregar, eliminar, editar }
}