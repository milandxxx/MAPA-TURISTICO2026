import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import './assets/globalstyle.css'
import './assets/animations.css'

createApp(App)
  .use(router)
  .use(PrimeVue)
  .mount('#app')
  