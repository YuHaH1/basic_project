const fs = require('fs')


export const findDir = (url = '') => fs.readdirSync(url)

export const isDir = (url) => {
    const stats = new fs.Stats()
    return stats.isDirectory(url)
}
export const existFile = (path) => fs.existsSync(path)

export const readFileSync = (path) =>fs.readFileSync(path, 'utf-8')
