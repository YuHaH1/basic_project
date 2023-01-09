import type { App,ComponentOptions } from "vue"
interface IModule<T> {
    default: T
}
export default (app:App) => {
    const modules = import.meta.glob('../../components/global/*.vue', { eager: true })  as Record<string,IModule<ComponentOptions>>
    const paths = Object.keys(modules)
    paths.forEach(path => {
        const component = modules[path].default
        app.component(component.__name!,component)
    })
}