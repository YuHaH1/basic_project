import { fileURLToPath, URL } from 'node:url'
//mock数据插件
import mockJS from './config/mockJS/index'
//自动导包 
import AutoImport from './config/plugins/autoImport'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    build: {
      target: ['Chrome >=87'],//vite会根据浏览器版本自动注入plofill兼容代码JS
      assetsInlineLimit: 4096,//默认值将图片转base64小于4096k的
      cssCodeSplit:true,//分割css代码
    },
    plugins: [
      vue(),
      mockJS({
        root_url:'./config/mock'
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
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
