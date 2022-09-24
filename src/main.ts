import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import "virtual:windi.css";
// import infiniteScroll from 'vue-infinite-scroll'

const app = createApp(App)
app.use(ElementPlus)
// app.use(infiniteScroll)
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })