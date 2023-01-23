import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './plugins/router'
import 'element-plus/dist/index.css'
import "virtual:windi.css";


const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })