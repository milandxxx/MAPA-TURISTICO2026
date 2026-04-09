import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/global.css'

const app = createApp(App)

app.use(router)

app.config.errorHandler = (err) => console.error(err)
window.addEventListener('unhandledrejection', e => console.error(e.reason))

app.mount('#app')
