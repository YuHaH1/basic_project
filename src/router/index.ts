import { createRouter, createWebHistory } from 'vue-router'
import defaultRouters from './static'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:defaultRouters
})

export default router
