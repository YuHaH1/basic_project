import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import autoRegisterCompoents from './common/functions/autoRegisterComponents'
import autoRegisterRouter from './common/functions/autoRegisterRouter'

const app = createApp(App)
//自动注册路由和组件
autoRegisterCompoents(app)
autoRegisterRouter()

app.use(createPinia())
app.use(router)

app.mount('#app')
