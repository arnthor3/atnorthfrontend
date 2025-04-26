import { createApp } from 'vue'
import { worker } from './mocks/browser'
import './style.css'
import App from './App.vue'

await worker.start()

createApp(App).mount('#app')
