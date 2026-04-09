import { ref } from 'vue'

export const loading = ref(false)
export const toasts = ref([])

export const showToast = (msg) => {
  const id = Date.now()
  toasts.value.push({ id, msg })
  setTimeout(()=>removeToast(id),3000)
}

export const removeToast = (id) => {
  toasts.value = toasts.value.filter(t=>t.id!==id)
}
