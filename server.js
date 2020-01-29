//Dependencies
var express = require("express");
var mongojs = require('mongojs');
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require('path');
var exphbs = require("express-handlebars");

require('dotenv').config()

//axios and cheerio for scraper
var axios = require('axios');
var cheerio = require('cheerio');

var db = require('./models');

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(logger('dev'));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access
var scraperRoute = require("./routes/scraperRoute");
var articleRoute = require('./routes/articleRoutes');
var htmlRoute = require('./routes/htmlRoute');

app.use('/data', scraperRoute);
app.use('/api', articleRoute);
app.use(htmlRoute);

app.listen(PORT, () => {
	console.log("App now listening at localhost:" + PORT);
});