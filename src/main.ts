import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import "virtual:windi.css";
import vClickOutside from "click-outside-vue3"

const app = createApp(App)
app.use(ElementPlus)
app.use(vClickOutside)
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })