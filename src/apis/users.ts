import request from '../common/js/request'
export const getUserInfo = (param:any) => request('/api/user',param)
