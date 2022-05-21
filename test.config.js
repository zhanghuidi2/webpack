const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // 入口文件
  entry: './src/test.js',
  // 出口文件
  output: {
    path: path.resolve(__dirname, './dist'), // 输出绝对路径
    filename: 'main.js' // 输出文件的名字
  },
  mode: 'development',

  // 多文件应用
  // module,一个模块一个chunk, 一个出口文件一个chunks,一个chunks至少包含一个chunk
  // entry: {
  //   test1: './src/test.js',
  //   test2: './src/test2.js'
  // },
  // output: {
  //   path: path.resolve(__dirname, './dist'),
  //   filename: '[name].js'
  // },
  // mode: 'production'


  //! loder 模块解析器, 处理webpack不能处理或者解析的模块，webpack不能接戏的模块有jsx, vue， css, sass等，只能识别js和json

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'] // 一个loader只会做一件事情，css-loader只是字符串转译， style-loader是将json字符串放到header里面
      },
      {
        test: /.\png|jpg$/,
        use: ['file-loader']
      }
    ]
  },

  //! plugin 插件， 扩展webpack的功能

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/test.html',
      filename: 'test.html'
    })
  ]
}