import AutoImport from 'unplugin-auto-import/vite'
export default (options:any) => {
    const option = Object.assign({ 
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
      ],
      dts: './auto-imports.d.ts',//为了支持自动导入模块的ts能正常使用
      dirs: [//自定义自动导入的模块
        './src/apis',
      ],
      imports: [
        // presets
        'vue',
        'vue-router',
        // custom
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          'axios': [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        },
      ],
      eslintrc: {
        enabled: true, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
        filepath: './.eslintrc-auto-import.json', // 生成json文件,eslintrc中引入
        globalsPropValue: true,
      },
    },options)
    return AutoImport(option)
}
