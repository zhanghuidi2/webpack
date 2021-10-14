const path = require('path')
// webpack的0配置
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js", // 打包后的文件名字
    path: path.resolve(__dirname, "./dev") // 打包后代码存放的位置,必须是绝对路径
  }
}