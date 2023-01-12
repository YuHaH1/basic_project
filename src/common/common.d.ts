import { type AxiosRequestConfig,type AxiosHeaders } from "axios"



interface IAxiosConfig{
    hideLoading?: Boolean = true
    loadingOptions?: {
        fullscreen: Boolean = true
        text: string = ''
        background:string = ''
    },
    repeatRequestConfig?: {
        interval:number
    }   
    cancelRepeatSubmit?: Boolean
}
declare module 'axios' {
    export interface AxiosRequestConfig extends IAxiosConfig{ }
    export interface AxiosHeaders extends {
        Authorization:string
    }
}
