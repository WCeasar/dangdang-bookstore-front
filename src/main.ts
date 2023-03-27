import { createApp } from 'vue'
import './style.css'

// /// <reference types="vite/client" />类型时从全局依赖vite/client中来的4

console.log(import.meta.env.BASE_URL)
import App from './App.vue'

createApp(App).mount('#app')
