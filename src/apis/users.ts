import request from '../common/js/request'
interface IUserInfo{
    id: number
    name: string,
    job:string
}
export const getUserInfo = (payload: any) => request<IUserInfo>('/api/user?id=123&a=213', {
    params: payload,
    cancelRepeatSubmit: true,
    repeatRequestConfig: {
        interval:1000
    }
}, 'get')