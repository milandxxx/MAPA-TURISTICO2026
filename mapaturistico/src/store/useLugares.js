import { defineStore } from 'pinia'
import axios from 'axios'

const API = 'http://localhost:8000'

export const useLugaresStore = defineStore('lugares', {
  state: () => ({
    lugares: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchLugares() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(${API}/lugares)
        this.lugares = res.data
      } catch {
        this.error = 'Error cargando lugares'
      } finally {
        this.loading = false
      }
    }
  }
})
