import css from  './index.css'
console.log('webpack')
import a from './a'
console.log(a)
// a也是会变成chunk
// 一个dist里面的一个js对应一个chunks,一个chunks至少包含一个chunk
// webpack打包后的文件就是一个自执行函数
  // (function() {
  
  // })({})