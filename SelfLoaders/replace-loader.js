module.exports = function (source) {
  return source.replace('kkb', this.query.name)
}