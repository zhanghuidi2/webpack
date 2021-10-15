// import css from  './index.css'
// import css from './css/index.css'
import css from './css/index.less'
// css需要考虑的是 less sass stylus postcss 如何把css样式抽离成独立的文件
// babel处理js的能力之于postcss处理css
// 把css抽离承担成单独的文件 MiniCssExtractPlugin插件
console.log('webpack')
import a from './a'
console.log(a,'开课吧')
// a也是会变成chunk
// 一个dist里面的一个js对应一个chunks,一个chunks至少包含一个chunk
// webpack打包后的文件就是一个自执行函数
  // (function() {
  
  // })({})