const express = require('express')
const app = new express()
app.get('/api/inof', (req, res) => {
  res.json({
    name: '开课吧'
  })
})
app.listen(9002, () => {
  console.log('----')
})