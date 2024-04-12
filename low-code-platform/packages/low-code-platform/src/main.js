import { createApp } from 'vue'
import './assets/css/style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/routes/index.js'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

app.mount('#app')
