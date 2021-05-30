import { createApp } from 'vue'
import App from './App.vue'
import store from './store/'
// 组件之间的通信
import mitt from 'mitt'

const app = createApp(App)
app.use(store)
app.mount('#app')

// createApp(App).use(store).mount('#app')
app.config.globalProperties.$systemName = '挂在全局的属性';
app.config.globalProperties.$EventBus = new mitt();
