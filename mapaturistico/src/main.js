import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'maplibre-gl/dist/maplibre-gl.css'

createApp(App).use(router).mount('#app')
