module.exports = {
  plugins: [
    require("autoprefixer"), // 给浏览器加前缀
    require("cssnano") // 压缩css 去除多余的空格
  ]
}