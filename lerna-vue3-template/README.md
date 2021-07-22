## 本项目的主要是测试lerna引入到vue项目
 * 安装lerna包,以后开发可以采用分包模式的方式进行开发；
 * 可以将公共的文件已包的形式进行业务组件的开发，多处引用；
 * 针对文件引入时不需要在逐次的查找文件文件，直接引入报名即可；
 ```js
 import HookButton from '@kage/wj-button';
 import alert from "@kage/wj-alert";
 ```
## 如何运行本项目

> 执行如下命令
```
 yarn bootstrap
 // 此命令类似npm install
```
> 运行项目
```js
yarn dev
```
> 安装jscpd对项目的代码进行重复率扫描检测
```
npm i jscpd -D
```
> 配置jscpd的打包命令
```
"cpd": "jscpd ./ --config .jscpd.json"
```
> 配置生成重复率扫描的的打包报告命令
```
"cpd:report": "jscpd ./ --config .jscpd.html-report.json"
```