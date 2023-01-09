import { fileURLToPath, URL } from 'node:url'
//mock数据插件
import mockJS from './config/mockJS/index'
//自动导包 
import AutoImport from './config/plugins/autoImport'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    plugins: [
      vue(),
      mockJS({
        root_url:'./config/mock'
      }),
      AutoImport(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      open:true
    }
  }
})
