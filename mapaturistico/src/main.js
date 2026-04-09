import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.css'

createApp(App).use(router).mount('#app')
app.config.errorHandler = (err) => console.error(err)
window.addEventListener('unhandledrejection', e => console.error(e.reason))
