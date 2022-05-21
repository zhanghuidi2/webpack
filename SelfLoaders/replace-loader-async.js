module.exports = function (source) {
  const callback = this.async() // 异步
  setTimeout(() => {
    callback(null, source.replace('start', this.query.name))
  }, 2000)
}