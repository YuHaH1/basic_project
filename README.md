# basic_project

这是一个VUE3 TS PINIA VITE 的项目，该项目集成了很多功能，例如：自动注册路由，自动注册组件，通过脚手架命令行创建组件，代码规范，git提交规范等，目前还在开发中



## 项目的基建功能

1. 自动注册路由，会将views的文件夹下index.vue页面通过router.addRouter方式添加
2. 自动注册全局组件，会将components/global文件夹下的组件注册为全局组件
3. 本地文件mockjs，在config/mock下创建的文件作为接口路径，json文件提供数据即可
4. 







## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm run lint
```



### cli

通过该命令可以快速创建生成vue组件

```shell
pnpm fish components
```

