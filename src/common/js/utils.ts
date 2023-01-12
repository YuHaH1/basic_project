import type { AxiosRequestConfig, CancelTokenSource } from "axios"
import type {TMethods} from '../types/request.type'
interface IRequestMap {
    url: string,
    payload: Record<string, any>,
    time: number,
    method: TMethods
}

export const cancelRepeatSubmit = () => {
    const CancelToken = axios.CancelToken;
    const source: CancelTokenSource = CancelToken.source();
    const requestMap = new Map<string, IRequestMap>()
    return (config: AxiosRequestConfig): Boolean | CancelTokenSource => {
        const url = config!.url || ''
        const res = requestMap.get(url)
        const payload = config.method === 'get' ? getUrlParams(url) : config.data
        const data: IRequestMap = {
            url,
            payload,
            time: new Date().getTime(),
            method:config!.method
        }
        res ?
            requestMap.set(url, {
                url: res!.url,
                payload: res!.payload,
                time: new Date().getTime(),
                method:res.method
            })
            : requestMap.set(url, data)
        const now = new Date().getTime()
       
        
        const interval = config.repeatRequestConfig?.interval || 2000
        console.log(interval,'interval');
        const mapTime = res?.time || 0
        if (now - mapTime < interval
            && equalObject(res?.payload, payload)
            && config?.method === res?.method
        ) {
            return source
        }
        return false
    }
}
export const equalObject = (mapPayload: any, configPayload: any): boolean => {
    if (!configPayload && !mapPayload) {
        return true
    }
    const mapPayloadKeysLength = Object.keys(mapPayload || {}).length
    const configPayloadKeysLength = Object.keys(configPayload || {}).length
    if (mapPayloadKeysLength !== configPayloadKeysLength) {
        return false
    }
    return JSON.stringify(mapPayload) === JSON.stringify(configPayload)
}
export const getUrlParams = (url: string): Record<string, any> => {
    const get_url = url.split('?')?.[1]
    const obj = {} as Record<string, any>
    if (get_url) {
        const paramsObj = new URLSearchParams(get_url)
        paramsObj.forEach((value, key) => {
            obj[key] = value
        })
    }
    return obj
}
