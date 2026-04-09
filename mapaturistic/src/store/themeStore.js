import { ref } from 'vue'

export const dark = ref(localStorage.getItem('dark') === 'true')

export const toggleTheme = () => {
  dark.value = !dark.value
  localStorage.setItem('dark', dark.value)
  document.body.className = dark.value ? 'dark' : ''
}
