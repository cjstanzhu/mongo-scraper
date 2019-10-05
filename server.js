let express = require("express");
let mongoose = require("mongoose");
let logger = require("morgan");

let axios = require("axios");
let cheerio = require("cheerio");

let db = require("./models");
let PORT = process.env.PORT || 3000;

let app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local database
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoscraperdb";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log(`Server listening on: http://localhost: ${PORT}`);
});

module.exports = app;

