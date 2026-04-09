import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
<<<<<<< HEAD
import './assets/global.css'

createApp(App).use(router).mount('#app')
app.config.errorHandler = (err) => console.error(err)
window.addEventListener('unhandledrejection', e => console.error(e.reason))
=======

createApp(App).use(createPinia()).use(router).mount('#app')
>>>>>>> origin/main
