var express = require('express')
var cheerio = require("cheerio");
var axios = require("axios");

var router = express.Router();

var article = require('../models/Article')
var db = require('../models');

router.get("/scraper", (req, res) => {

	// Take from site
	axios.get("https://www.nytimes.com").then((response) => {

		var $ = cheerio.load(response.data);

		// Empty array for scraped data
		var results = [];

		$("article").each((i, element) => {

			var title = $(element).children().text();
			var link = $(element).find("a").attr("href");

			// push to array
			results.push({
				title: title,
				link: link,
			});
		});

		console.log(results);
		res.json(results);

		// Create a new article
		db.Article.create(results)
			.then(function (dbArticle) {
				console.log(dbArticle);
			})
			.catch(function (err) {

				console.log(err);
			});
	});
});

module.exports = router;