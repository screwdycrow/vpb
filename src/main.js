import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";
import './vpb/styles/index.css'
import './assets/styles.css'
import vpb from "@/plugins/vpb";

createApp(App)
    .use(router)
    .use(createPinia())
    .use(vpb,{router})
    .mount('#app')
