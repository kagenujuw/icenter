import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueGridLayout from 'vue-grid-layout';

const vm = createApp(App);

vm.use(VueGridLayout)
vm.mount('#app')
