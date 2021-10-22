// 插件是在webpack打包的生命周期的某一个阶段干一些事情

class txtwebpackplugin {
  constructor(options) {

  }
  // 一个插件如何注册钩子
  apply(compiler) {
    // 当打包走到emit阶段的时候开始执行主体
    // tapSaync compilation webpack的内容
    // emit
    compiler.hooks.emit.tapSaync("事件名", (compilation, cb) => {
      console.log(compilation.assets)
      compilation.assets["test.txt"] = {
        source: function () {
          // 资源的内容
          return '这是一个测试文档'
        },
        size: function () {
          // 资源的大小
          return 1024
        }
      }
      cb()
    })
  }
}

export default txtwebpackplugin