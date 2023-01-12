import axios,
{
    type AxiosRequestConfig,
    type AxiosResponse,
    type AxiosInstance,
    type AxiosError,
    type CancelTokenSource
}
    from 'axios'
import { ElLoading } from 'element-plus'
import type { TMethods, IResponse } from '../types/request.type'
import { cancelRepeatSubmit } from './utils'
import router  from '../../router/index'

let loadingInstance: any = null
const defaultLoadingOptions = {
    loadingOptions : {
        fullscreen: true,
        text : '加载中',
        background: '',
    }
}
const cancelRepeatSubmitFun = cancelRepeatSubmit()
function request<T>(url:string,config:Record<string,any>,methods:TMethods='get') :Promise<IResponse<T>>{
    const instance = axios.create({
        timeout:5000,
    }) as AxiosInstance
    instance.interceptors.request.use((cg: AxiosRequestConfig) => {
        const token = localStorage.getItem('token')
        const lastConfig = Object.assign(defaultLoadingOptions, cg)

        lastConfig.cancelRepeatSubmit = true
        if (lastConfig.cancelRepeatSubmit) {
            const source = cancelRepeatSubmitFun( lastConfig)
            lastConfig.cancelToken = source ? (source as CancelTokenSource).token : undefined;
            (source as CancelTokenSource).cancel && (source as CancelTokenSource).cancel('请求重复已经取消');
        }
        if (token) {
            lastConfig!.headers!.Authorization = 'Bearer ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        if (!lastConfig.hideLoading) {
            loadingInstance = ElLoading.service(lastConfig.loadingOptions)
        }
        return lastConfig
    }, err => {
        return Promise.reject(err)
    })
    instance.interceptors.response.use((res: AxiosResponse) => {
        Promise.resolve().then(() => {
            loadingInstance && loadingInstance.close()
            loadingInstance = null
        })
        const { code } = res.data
        if (res.status === 401) {//没权限跳转登录页或者refresh token
            // router.replace()
        }
        if (+code !== 0) {
            return Promise.reject(res.data.msg ||'网络异常')
        }
        return res.data
    }, (err: AxiosError) => {
        Promise.resolve().then(() => {
            loadingInstance && loadingInstance.close()
            loadingInstance = null
        })
        return Promise.reject(err)
    })
    const { data, params, ...configObj } = config
    return instance[methods](url,data||params,configObj)
}

export default request