const Koa = require('koa');
const static = require('koa-static');
const path = require('path');
const colors = require('colors-console');
const koaBody = require('koa-body');
const Router = require('koa-router');
const axios = require('axios');
const Mock = require('mockjs');
const fs = require('fs'); // 引入文件系统模块
const cors = require('koa-cors');
const xlsx = require('node-xlsx');

// 此配置文件用来区分部署是开发环境还是正式环境
let app = new Koa();
// 解决跨域
let router = new Router();

// 解决跨域问题
// app.use(cors);

// 处理post请求
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024  // 设置上传文件大小最大限制，默认为2M
  }
}));

// 获取当前nodejs的运行环境
// console.log(colors('cyan', process.env.NODE_ENV))

// 所有请求都走的路径
app.use(async (ctx, next) => {
  let header = ctx.request.header;
  await next();
})

const result = (ctx, fn) => {
  let header = ctx.request.header;
  if(!header['x-auth-value']) {
    fn && fn();
  } else {
    ctx.body = {
      bo:null,
      code: {
        code: '0002',
        msg: 'x-auth-value 不存在'
      }
    }
  }
}

router.get('/', async (ctx) => {
  result(ctx, function(){
    ctx.body = 'hello world';
  })
})

const getFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./template.xlsx',function(err,data){
      if (err){
        reject(err);
      }else{
        resolve(data.toString());
      }
    })
  })
}

router.get('/file',async (ctx, res) => {
  result(ctx, async ()=>{
    // let str = await getFile();
    // console.log(str)
    // 同步读取文件
    let json = fs.readFileSync(path.resolve(__dirname, "./template.xlsx"), 'utf-8');
    // let json = fs.readFileSync(path.resolve(__dirname, "./package.json"), 'utf-8');
    // console.log(json)
    ctx.body = json
  })
})

// //读取文件内容
// var obj = xlsx.parse(__dirname+'/template.xlsx');
// var excelObj=obj[0].data;
// console.log(excelObj);
// var data = [];
// for(var i in excelObj){
//   var arr=[];
//   var value=excelObj[i];
//   for(var j in value){
//     arr.push(value[j]);
//   }
//   data.push(arr);
// }
// var buffer = xlsx.build([
//   {
//     name:'sheet1',
//     data:data
//   }
// ]);
// console.log(buffer)
// //将文件内容插入新的文件中
// fs.writeFileSync('test1.xlsx',buffer,{'flag':'w'});

router.get('/send',async (ctx, res) => {
  result(ctx, function(){
    let data = Mock.mock({
      // 属性list的值是一个数组， 其中含有1到10个元素
      'list|1-10':[{
        // 属性id是一个自增数，起始值为1，每次增1
        'id|+1':1,
        'name|1-2': Mock.Random.cname()
      }]
    })
    ctx.body = {
      bo: data.list,
      code: {code: '0000', msg: '返回成功'},
      other: null
    }
  })
})

router.get('/task', async (ctx, res) => {
  result(ctx, function(){
    let arr = [];
    let Random = Mock.Random;
    for(var i = 0; i < 10; i++) {
      let obj = {
        id: Random.id(),
        guid: Random.guid(),
        name: Random.cname(),
        age: Random.integer(20, 50),
        asset: Random.float(200, 5000000, 1, 6),
        married: Random.boolean(),
        birth: Random.datetime('yyyy-MM-dd HH:mm:ss'),
        birth2: new Date(Random.datetime('yyyy-MM-dd HH:mm:ss')),
        addr: `${Random.province()}-${Random.city()}-${Random.county()}`,
        email: Random.email('qq.com'),
        word: Random.cword(2, 5),
        string: Random.string(),
        title: Random.ctitle(10, 15),
        senetence: Random.csentence(15, 20),
        paragraph: Random.cparagraph()
      }
      arr.push(obj)
    }
    ctx.body = {
      bo: arr,
      code: {code: '0000', msg: '返回成功'},
      other: null
    }
  })
})



app.use(router.routes());
app.use(router.allowedMethods());

// 静态页面访问
app.use(static(path.resolve(__dirname)+'/public/'))

// 启动服务端
app.listen(3000, (err) => {
  if(err) {
    console.log('serve is running failed')
  } else {
    console.log('listen is running at port 3000')
  }
})















