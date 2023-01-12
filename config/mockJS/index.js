import { findDir, readFileSync ,existFile} from '../utils'
const path = require('path')

/**
 * 是用于配置开发服务器的钩子。最常见的用例是在内部 connect 应用程序中添加自定义中间件:
 */
export default (options = {}) => {
    const cwd = process.cwd()
    const defaultOptions = {
        url: '/api',
        root_url: './src/mock'
    }
    const option = Object.assign(defaultOptions, options)
    return {
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                // 自定义请求处理...
                const url = req.url
                if (url.startsWith(option.url)) {
                    res.setHeader('Content-Type', 'application/json')
                    //取出api开头的路径或者用户自定义的
                    let url_path = req.url.replace(option.url, '')
                    url_path = url_path.includes('?') ? url_path.split('?')[0] : url_path

                    //根据路径去找src下的mock下的json文件
                    const mock_url = path.resolve(cwd, option.root_url + url_path)
                    if (!noSuchFile(mock_url, res)) {
                        return 
                    }
                    const dir_res = findDir(mock_url) || []
                    //找到json文件取出其数据
                    const file_path = dir_res[0] && path.resolve(cwd, mock_url + '/' + dir_res[0])
                    if (!noSuchFile(file_path, res)) {
                        return 
                    }
                    const file_res = readFileSync(file_path)
                    //发送给客户端
                    res.end(file_res)
                    return
                }
                next()
            })
        },
    }
}
const noSuchFile = (url, res) => {
    if (existFile(url)) {
        return true
    }
    res.end(JSON.stringify({
        code: 8,
        data:null,
        msg: 'faild->路径有误无法找到文件',
    }))
    return false
}
