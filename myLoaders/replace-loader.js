// loder是一个函数,不可以是一个箭头函数
//  loader 必须有返回值，字符串或者buffer
// this.query 对应用户传过来的options
// 如何返回多个信息 this.callback
// 异步
module.exports = function (source) {
  console.log('loader ', this.query)
  const callback = this.async() // 就是this.callback
  setTimeout(() => {
    const content = source.replace('开课吧', '开课吧你好')
    callback(null, content)
  }, 3000)
  
  // this.callback(null, content)
}