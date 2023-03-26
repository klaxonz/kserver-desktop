import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './plugins/router'
import 'element-plus/dist/index.css'
import "virtual:windi.css"
import vueClickOutsideElement from 'vue-click-outside-element'

const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.use(vueClickOutsideElement)
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })