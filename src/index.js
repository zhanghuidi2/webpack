// import "@babel/polyfill"

// import css from  './index.css'
import css from './css/index.css'
// import css from './css/index.less'
// css需要考虑的是 less sass stylus postcss 如何把css样式抽离成独立的文件
// babel处理js的能力之于postcss处理css
// 把css抽离承担成单独的文件 MiniCssExtractPlugin插件
console.log('webpack')
import a from './a'
console.log(a,'开课吧44ww')
// a也是会变成chunk
// 一个dist里面的一个js对应一个chunks,一个chunks至少包含一个chunk
// webpack打包后的文件就是一个自执行函数
  // (function() {
  
  // })({})


  // 静态资源
import pic from './images/file.png'
console.log(pic) // f935a8a44bc09edab8836ef61f7e606c.png这个就是使用file-loader之后的图片地址
// 图片的使用方式，js dom
// const img = new Image()
// img.src = pic
// const app = document.getElementById('app');
// console.log(app, 'app')
// // app.append(img)



// dev-server
// import axios from 'axios'
// axios.get('/api/inof').then(res => {
//   console.log('=======')
// })


// css模块HMR
// var btn = document.createElement('button')
// btn.innerHTML = '新增'
// document.body.appendChild(btn)
// btn.onclick = function () {
//   var div = document.createElement('div')
//   div.innerHTML = 'item'
//   document.body.appendChild(div)
// }

// js模块HMR

// import couter from './counter'
// import number from './number'
// couter()
// number()


// babel
const arr = [1, 2, 3]
const newArr = arr.map(item => item * 8)
console.log(newArr)

Promise.resolve(res => {
  console.log(9)
})