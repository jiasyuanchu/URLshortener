const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
