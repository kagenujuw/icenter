const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // 下载接口
  if (req.url === "/file") {
    res.writeHead(200, {
      "Content-type": "application/vnd.ms-excel", // 返回 excel
      // 跨域设置
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
    });

    // 异步读取文件内容
    fs.readFile("./template.xlsx", (err, data) => {
      // 返回二进制文件流
      res.end(data);
    });
  }
});

server.listen(3000, () => {
  console.log("Node.js server is running at port 3000!");
});