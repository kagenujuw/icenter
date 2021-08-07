## 此文件主要是配合Spreadjs文件里面的粘贴远程URL地址下载Excel的功能配合使用

> server.js文件启动可以配合前端调试请求的接口数据

> app.js文件启动主要是配合做Excel的导出，返回给前端的二进制流

> 项目的启动

* 安装模块
```
npm i
```
* 启动服务
```
node app.js
// node server.js
```
* 启动服务向实时修改自动更新服务，需要全局安装nodemon模块
```js
npm i nodemon -g
# 启动服务的方式是nodemon app.js
```



