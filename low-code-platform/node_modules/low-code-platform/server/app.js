import http from 'http'
import fs from 'fs'

// 创建http服务，req请求对象   res响应对象
http.createServer((req, res) => {
  // 获取请求地址主机端口后地址
  const url = req.url;
  // 设置响应头，响应的数据类型
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  // 请求地址拦截
  if (url === "/api/menu") {
    // 读取JSON文件中数据，并响应到客户端
    const data = fs.readFileSync("../mockData/menu.json", "utf-8");
    res.end(data);
  } else if (url === "/api/blog") {
    const data = fs.readFileSync("../mockData/blog.json", "utf-8");
    res.end(data);
  } else {
    res.end("Hello Node");
  }
})
.listen("8990"); // 设置端口号

// 服务器正常启动，打印下面这句话作为提示
console.log("Server running at http://127.0.0.1:8990");
