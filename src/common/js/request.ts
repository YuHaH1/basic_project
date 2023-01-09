import axios from 'axios'

const instance = axios.create({
    timeout:5000,
})
instance.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})
instance.interceptors.response.use(res => {
    const { code } = res.data
    if (+code !== 0) {
        throw new Error(res.msg ||'网络异常')
    }
    return res.data
}, err => {
    return Promise.reject(err)
})

export default instance