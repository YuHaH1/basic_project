import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import autoRegisterCompoents from './common/functions/autoRegisterComponents'

const app = createApp(App)
autoRegisterCompoents(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
