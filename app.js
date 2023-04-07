const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record')


const app = express()
const port = 3000

require("./config/mongoose")//connect to the database

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))// setting static files
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes);//use the routers


app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
}) //開啟監聽
