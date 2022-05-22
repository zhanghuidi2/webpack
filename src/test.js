console.log('kkb')
// import num from './test3'
// console.log(num)
import css from './test.css'
// console.log(css, a)
// import css from './css/index.css'
// import less from './css/index.less'
// import img from './file.png'
// const Img = document.createElement('img')
// Img.src = img
// const app = document.getElementById('app')
// app.appendChild(Img)
const body = document.body
const btn = document.createElement('button')
btn.innerHTML = '新增'
body.append(btn)
btn.onclick = function () {
  const div = document.createElement('div')
  div.innerText = 'item'

  body.appendChild(div)
}