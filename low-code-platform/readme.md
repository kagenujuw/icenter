### 拉取工程的命令
```
npm create vite@latest
```
### 根目录安装
```
yarn 或者 npm i
```

### 注意lerna.json的配置文件下面不需要配置参数useWorkspaces,否则打包失败
```json
"useWorkspaces": true,
```

### button 目录下执行
```
yarn link
```

### low-code-platform目录下执行
```js
yarn link @kage/button
```