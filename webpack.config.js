const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const minicss = require("mini-css-extract-plugin")
// // webpack的0配置
// module.exports = {
//   entry: "./src/index.js",
//// 等价于 entry : {
////  main : "./src/index.js"
//// }
//   output: {
//     filename: "main.js", // 打包后的文件名字
//     path: path.resolve(__dirname, "./dist") // 打包后代码存放的位置,必须是绝对路径
//   }
// }


// 单页应用
// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "main.js", // 打包后的文件名字
//     path: path.resolve(__dirname, "./dist") // 打包后代码存放的位置,必须是绝对路径
//   },
//   // 打包模式： none developement production
//   // development: 开发模式，注重开发体验，代码不会被压缩,输出信息比较多有利于阅读和排错
//   // production: 
//   mode: "development"
// }

// 多页应用
// 多入口对应多出口
// chunk代码片段
module.exports = {
  entry: {
    index: "./src/index.js",
    list: "./src/list.js"
  },
  output: {
    filename: "[name].js", // 占位符
    path: path.resolve(__dirname, "./dist") // 打包后代码存放的位置,必须是绝对路径
  },
  mode: "development",
  // webpack默认只支持js,json文件，像vue,jpg,ts,sass,css这些文件不支持，就需要模块解析器loader来处理了
  // loader是处理webpack不能处理的文件
  // css-loader只是把css识别成chunk,序列化
  // style-loader在html头部动态添加一个style标签，把chunk插入
  resolveLoader: {
    modules: ["node_modules", "./myLoaders"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader","css-loader"], // 从后往前，先编译成chunk，再把css插入到dom中
      },
      {
        test: /\.less$/,
        use: [
          "kkb-style-loader","kkb-css-loader", "kkb-less-loader"
        ]
        // use: [
        //   minicss.loader,
        //   // "style-loader",
        //   "css-loader",
        //   "postcss-loader",
        //   {
        //     loader: "less-loader",
        //     options: {
        //       sourceMap: true
        //     }
        //   }
        // ], // 从后往前，先编译成chunk，再把css插入到dom中
      },
      // {
      //   test: /\.js$/,
      //   use: path.resolve(__dirname, "./myLoaders/replace-loader.js")
      // },
      {
        test: /\.js$/,
        use: {
          loader: "replace-loader",
          options: {
            name: 'hhhhhhh'
          }
        }
      }
    ],
  },
  // plugin 插件 是webpack的功能扩展
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new minicss({
      filename: "[name].css", // 占位符，会和src里的名字保持一致
  })]

}