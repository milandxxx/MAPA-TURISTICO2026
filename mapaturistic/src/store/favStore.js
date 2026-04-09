import { ref } from 'vue'

const load = () => {
  try { return JSON.parse(localStorage.getItem('fav')) || [] }
  catch { return [] }
}

export const favoritos = ref(load())

const save = () => localStorage.setItem('fav', JSON.stringify(favoritos.value))

export const toggleFav = (l) => {
  const i = favoritos.value.findIndex(x => x.id === l.id)
  if (i >= 0) favoritos.value.splice(i,1)
  else favoritos.value.push(l)
  save()
}
