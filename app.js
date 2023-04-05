const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send("hello world!")
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
