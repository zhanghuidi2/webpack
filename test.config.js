const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const minicss = require('mini-css-extract-plugin')
module.exports = {
  // 入口文件
  entry: './src/test.js',
  // 出口文件
  output: {
    path: path.resolve(__dirname, './dist'), // 输出绝对路径
    filename: 'main.js' // 输出文件的名字
  },
  mode: 'development',

  resolveLoader: {
    modules: ['node_modules', 'SelfLoaders']
  },

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
        use: ['self-style-loader', 'self-css-loader', 'postcss-loader'], // 一个loader只会做一件事情，css-loader只是字符串转译， style-loader是将json字符串放到header里面
        
      },

      // ! postcss-loader处理css,拥有1000多个插件
      {
        test: /\.less$/,
        use: [
          // !两者只能存在一个
          // 'style-loader',
          minicss.loader,
          'css-loader', 'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
        }] // 一个loader只会做一件事情，css-loader只是字符串转译， style-loader是将json字符串放到header里面
      },
      {
        test: /.\png|jpg$/,
        use: ['file-loader']
      },
      {
        test: /.\js/,
        use: [
          // !自定义插件 引入path.resolve， 或者使用resolveLoader
          {
            // loader: path.resolve(__dirname, './SelfLoaders/replace-loader.js'),
            loader: 'replace-loader',
            options: {
              name: 'hello'
            }
          },
          {
            // loader: path.resolve(__dirname, './SelfLoaders/replace-loader-async.js'),
            loader: 'replace-loader-async',
            options: {
              name: 'word'
            }
          }
        ]
      }
    ]
  },

  //! plugin 插件， 扩展webpack的功能

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/test.html',
      filename: 'test.html'
    }),
    new minicss({
      filename: '[name].css' 
    }), // ! 将html的header里的css抽离成css单独的文件，用link的方式引入css

    // ! 第一步引入插件， 并且打包后的filename命名一下
    // ! 第二部，替换style-loader -> minicss.loader (这个插件本身自带的loader)
  ]
}