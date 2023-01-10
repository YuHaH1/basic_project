import type { RouteRecordRaw } from "vue-router"
import router from '../../router/index'

export default () => {
    const modules = import.meta.glob('../../views/*/index.vue', { eager: true }) as Record<string,{default:any}>
    const paths = Object.keys(modules)
    paths.forEach(v => {
        const arr = v?.match(/\/?(.*)\/index.vue/)?.[1].split('/')
        const name = arr?.[arr.length - 1]
        const route = Object.assign({
            name,
            component: modules[v].default,
            path:`/${name?.toLowerCase()}`
        } as RouteRecordRaw,modules[v].default.route)
        router.addRoute(route)
    })
}