# Vue 3 + Vite

# pnpm 多包工程的搭建

* 参考网页地址：https://blog.csdn.net/snowball_li/article/details/129699389
* 参考网页地址：https://blog.csdn.net/weixin_69230790/article/details/136389501

## 创建主工程
```
// 采用如下的命令快速创建一个vite+vue的工程
npm create vite 或 npm create vite@latest
```
## 根目录增加pnpm-workspace.yaml配置文件
```
packages:
  - 'packages/*'
  - 'packages/examples/**'
  - 'packages/temp/**'
```

## 根目录创建packages文件夹
```
mkdir packages
```
## 修改根目录的package.json的配置
```json
// 增加如下字段
{
  //...
  private: true,
  //...
}
```
## 进入packages目录
```
cd packages
```
## 创建子工程
```
pnpm create vite app-base --template vue-ts 或者 pnpm create vite app-base --template vue
```
```
pnpm create vite app1 --template vue-ts 或者 pnpm create vite app1 --template vue
```

## packages目录下app-base、app1的package.json删除如下内容
```
"dependencies": {
    "vue": "^3.4.29"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.5",
    "vite": "^5.3.1"
  }
```

## 在整个项目根目录下（test-demo）安装依赖
```
pnpm i
```
## app-base、app1分别在vite.config.js中设置端口号
```
server: {
    port: 5173
}
```
## 根项目package.json配置
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "build:all": "vite build && pnpm run -C packages/app-base build && pnpm run -C packages/app1 build",
  "preview": "vite preview",
  "app-base": "pnpm run -C packages/app-base dev",
  "app1": "pnpm run -C packages/app1 dev"
}
```
## 启动项目
```
pnpm run dev-base 或者 pnpm run app1
```