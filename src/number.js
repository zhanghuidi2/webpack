function number() {
  const div = document.createElement('div')
  div.innerHTML = 1
  div.onclick = function () {
    div.innerHTML = Number(div.innerHTML) + 10
  }
  div.style.marginTop = '200px'
  document.body.appendChild(div)
}
export default number