import { createApp } from 'vue'
import { worker } from './mocks/browser'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'
import router from './router'
const pinia = createPinia()

await worker.start()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
