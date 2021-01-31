const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  /** 
   * 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl从Vue CLI3.3起弃用，要使用publicPath
  */
  publicPath: process.env.NODE_ENV==="production"?"./":"./",// 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: 'dist',// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: 'static',//放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: 'index.html',//指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  filenameHashing:true,// 控制打包生成的文件是否带有hash值，默认带
  pages: {//pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {//除了 entry 之外都是可选的
      entry: 'src/main.js',// page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      // entry: 'src/index/main.js',// page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: 'public/index.html',// 模板来源
      filename: 'index.html',// 在 dist/index.html 的输出
      title: 'Index Page',// 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
    },
    subpage: 'src/main.js'
    // subpage: 'src/subpage/main.js'//官方解释：当使用只有入口的字符串格式时,模板会被推导为'public/subpage.html',若找不到就回退到'public/index.html',输出文件名会被推导为'subpage.html'
  },
  lintOnSave: true,// 是否在保存的时候检查
  runtimeCompiler:true,
  transpileDependencies:[],
  productionSourceMap: false,// 生产环境是否生成 sourceMap 文件
  css: {
    extract: true,// 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false,// 开启 CSS source maps
    loaderOptions: {},// css预设器配置项
    requireModuleExtension: false// 启用 CSS modules for all css / pre-processor files.
  },
  devServer: {// 环境配置
    host: 'localhost',
    port: 3333,
    https: false,
    hotOnly: false,
    hot:true,
    overlay:{
      warning:false,
      error:true
    },
    open: true, //配置自动启动浏览器
    proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  },
  // 构建时开启多进程处理babel编译
  parallel:require('os').cpus().length>1,
  // 离线处理参数
  pwa:{},
  configureWebpack:(config)=>{
    console.log(config.mode);
    if(process.env.NODE_ENV === 'production'){

    }else{

    }
  },
  chainWebpack:config => {
    config.resolve.alias.set('@', resolve('src'))
    .set('@c', resolve('src/components'))
  },
  pluginOptions: {// 第三方插件配置
    // ...
  }
};