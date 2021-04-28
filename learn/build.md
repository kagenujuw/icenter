# 针对vue-cli 2.0 如何配置三套环境
  * 本地开发环境--development
  * 测试环境打包--prodTest
  * 正式环境打包--production
## 一、首先需要安装cross-env解决环境变量的问题
```bash
# 安装
npm i cross-env -D
```
## 二、在package.json文件配置打包命令行
```bash
# scripts脚本里面添加需要配置打包的命令
"build:prod": "cross-env NODE_ENV=production node build/build.js",
"build:rc": "cross-env NODE_ENV=rc node build/build.js"
```
## 三、在config文件夹目录下新建rc.env.js文件
``` js
# 文件内容如下
'use strict'
module.exports = {
  NODE_ENV: 'rc',
  BASE_API: "http:rc.zte.com.cn"
}
```
## 四、在webpack.prod.js文件中增加环境判断，修改之前的env环境判断
```js
let env = null;
if(process.env.NODE_ENV === 'testing') {
  env = require('./config/test.env');
} else if(process.env.NODE_ENV === 'rc') {
  env = require('./config/rc.env');
} else if(process.env.NODE_ENV === 'production') {
  env = require('./config/prod.env');
}
```
## 五、注释掉build.js文件中的代码
```js
// process.env.NODE_ENV = 'production'
```
## 六、修改测试环境打包是新增加的环境判断，修改两个文件
* 修改utils.js文件
```js
const assetsSubDirectory = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'rc'
```
* 修改webpack.base.conf.js文件
```js
publicPath: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'rc'
```