import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/globalstyle.css'
import './assets/animations.css'

createApp(App).use(router).mount('#app')
