const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const minicss = require("mini-css-extract-plugin")
// 需要单独导出
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpack = require('webpack')
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
    // [name].js?v=[hash]
    path: path.resolve(__dirname, "./dist") // 打包后代码存放的位置,必须是绝对路径
  },
  mode: "development",
  // webpack默认只支持js,json文件，像vue,jpg,ts,sass,css这些文件不支持，就需要模块解析器loader来处理了
  // loader是处理webpack不能处理的文件
  // css-loader只是把css识别成chunk,序列化
  // style-loader在html头部动态添加一个style标签，把chunk插入
  // resolveLoader: {
  //   modules: ["node_modules", "./myLoaders"]
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader","css-loader"], // 从后往前，先编译成chunk，再把css插入到dom中
      },
      {
        test: /\.less$/,
        // use: [
        //   "kkb-style-loader","kkb-css-loader", "kkb-less-loader"
        // ]
        use: [
          minicss.loader,
          // "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ], // 从后往前，先编译成chunk，再把css插入到dom中
      },
      // {
      //   test: /\.js$/,
      //   use: path.resolve(__dirname, "./myLoaders/replace-loader.js")
      // },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "replace-loader",
      //     options: {
      //       name: 'hhhhhhh'
      //     }
      //   }
      // },
      // {
      //   test: /\.(png|jpe?g|gif)$/,
      //   use: [
      //     {
      //       loader: 'file-loader', // 在src下面引用图片还按照相对路径，这个loader会把图片转化成url
      //       options: {
      //         name: "[name].[ext]", // 生成图片的名字
      //         outputPath: "images/", // 图片的输出地址
      //         publicPath: "../images/" // 图片的引用地址
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader', // 是file-loader的加强版
            options: {
              name: "[name].[ext]", // 生成图片的名字
              outputPath: "images/", // 图片的输出地址
              publicPath: "../images/", // 图片的引用地址
              limit: 1024 * 100 // 9kb ，在这个范围内是base64
            },
          },
        ],
      },
      {
        test: /\.woff2$/,
        use: [
          {
            loader: 'file-loader', // 是file-loader的加强版
            options: {
              name: "[name].[ext]", // 生成图片的名字
              outputPath: "css/", // 图片的输出地址
              publicPath: "../css/", // 图片的引用地址
            },
          },
        ],
      },
      {
        test: /.\js/,
        use: {
          loader: 'babel-loader', // babel是一个工具，所以要使用编译es5还需要安装插件
          options: {
            presets: [
              ["@babel/preset-env", {
              // targets: {
              //   edge: '17',
              //   chrome: '67'
              // },
              // corejs: 2,
              useBuiltIns: "usage"
            }]]
          }
        }
      }
    ],
  },
  // devtool: "source-map", // inline-source-map,map文件不在以独立文件的方式存在，放到boudle文件的最后
  // inline-cheap-source-map 只用告诉在哪一行，不用告诉在哪一列
  // inline-cheap-moudule-source-map 第三方模块的错误信息
  devServer: {
    contentBase: './dist',
    port: 8081,
    open: true,
    hot: true,
    hotOnly: true, // 修改js的时候浏览器还会刷新，浏览器不让自动刷新
    proxy: {
      "/api": {
        target: "http://localhost:9002"
      }
    }
  },



  // plugin 插件 是webpack的功能扩展
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ["index"]
    }), // 生成的html会自动引入同级的js和css
    new HtmlWebpackPlugin({
      template: './src/list.html',
      filename: 'list.html',
      chunks: ["list"]
    }), // 生成的html会自动引入同级的js和css
    new minicss({
      filename: "css/[name].css", // 单独的生成css文件占位符，不走style-loader，会和src里的名字保持一致
    }),
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ]

}