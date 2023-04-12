const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;
const SERVER = `http://localhost:${PORT}/`;

process.env.NODE_ENV = process.env.NODE_ENV || "development";

require("./config/mongoose"); //connect to the database

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.static("public")); // setting static files
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router); //use the routers

app.listen(PORT, () => {
  console.log(`Express is listening on ${SERVER}`);
}); //開啟監聽

module.exports = PORT;
