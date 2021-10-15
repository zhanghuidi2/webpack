// 创建style标签
// style标签内部加入css
// 插入文档头部
module.exports = function (source) {
  return `const tag = document.createElement("style");
  tag.innerHTML = ${source};
  document.head.appendChild(tag)
  `
}