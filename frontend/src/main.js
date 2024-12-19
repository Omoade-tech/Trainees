// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import navbar from './components/navbar.vue'

const app = createApp(App)

app.use(createPinia())
app.component('navbar', navbar)
app.use(router)

app.mount('#app')
