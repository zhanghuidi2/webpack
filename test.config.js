const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const minicss = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  // 入口文件
  entry: './src/test.js',
  // 出口文件
  output: {
    path: path.resolve(__dirname, './dist'), // 输出绝对路径
    filename: '[name]-[hash:6].js' // 输出文件的名字
  },
  mode: 'development',

  resolveLoader: {
    modules: ['node_modules', 'SelfLoaders']
  },

  // devtool: 'source-map', // ! 打印错误日志，精确定位，eval-cheap-source-map
  
  // ! devServer的作用
  // ! 第一个托管webpack,接手webpack的工作
  // ! 第二个热更新，其实就是相当于帮助你手动刷新了一次，之前保存的数据都会丢失，每次修改文件，devServer会自动构建build，文件虽然不在dist里是放到了内存中，这样会读取文件更快，修改文件浏览器会快速更新
  // ! 如果需要保留之前的用户操作痕迹，那么就要hot: true

  // !! HMR 热模块替换 第一： 存在cssHMR 和 jsHMR; 第二： 不支持chunk-hash和content-hash
  devServer: {
    contentBase: './dist',
    port: 8081,
    open: true,
    // hot: true,
    // hotOnly: true, // 修改js的时候浏览器还会刷新，浏览器不让自动刷新
    proxy: {
      "/api": {
        target: "http://localhost:9002"
      }
    }
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
        use: [minicss.loader, 'css-loader', 'postcss-loader'], // 一个loader只会做一件事情，css-loader只是字符串转译， style-loader是将json字符串放到header里面
        
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
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'file-loader', // ! url-loader跟他一样，是file-loader的超集， 又一个limt选项，可以控制展示base64还是图片
          // ! base64的好处是不会发送请求
          options: {
            name: '[name].[ext]',
            outputPath: 'images/', // 导出的相对路径
            publicPath: '../images/' // css引入的相对路径
          }
        }
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

    // ! css文件引入图片，默认的路径都会替换成平级去拿png, 比如css文件是 ../images/file.png, 打包之后就回file.png
    new minicss({
      filename: './css/[hash:6].css' 
    }), // ! 将html的header里的css抽离成css单独的文件，用link的方式引入css
    // ! contentHash 只喝自己的变动有关，只有本身的文件变动，hash才会变
    // ! chunkHash 只和引用打包到一个chunks的变动关联文件有关
    // ! hash，整个项目不论哪里改动，他都要改变, 整体和出口文件保持一致

    // ! 第一步引入插件， 并且打包后的filename命名一下
    // ! 第二部，替换style-loader -> minicss.loader (这个插件本身自带的loader)
    new CleanWebpackPlugin()
  ]
}