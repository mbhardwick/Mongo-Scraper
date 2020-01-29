var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var router = express.Router();

var db = require('../models');

router.get("/articles", (req, res) => {
	//Most Recent
	db.Article.find().sort({ timestamp: -1 })
		.then((dbArticle) => {
			res.json(dbArticle);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Article by ID
router.get("/articles/:id", (req, res) => {
	db.Article.findById({ _id: req.params.id })
		.populate("note")
		.then((dbArticle) => {
			res.json(dbArticle);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Saving/Update
router.post("/articles/:id", (req, res) => {
	console.log(req.body);
	db.Note.create(req.body)
		.then((dbNote) => {
			return db.Article.findByIdAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
		})
		.then((dbArticle) => {
			res.json(dbArticle);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.put("/articles/:id", (req, res) => {
	console.log(req.body);
	db.Note.remove(req.body)
		.then((dbNote) => {
			return db.Article.findByIdAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
		})
		.then((dbArticle) => {
			res.json(dbArticle);
		})
		.catch((err) => {
			res.json(err);
		});
});


module.exports = router;