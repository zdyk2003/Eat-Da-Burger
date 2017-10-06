var express = require("express");

var router = express.Router();

//Import the model (burger.js)
var burgers = require("../models/burger.js");
//selectAll
router.get("/", function (req, res) {
	burgers.selectAll(function(data) {
		var hbsObject = {
			burgers: data
		};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});
});
//insertOne
router.post("/", function (req, res) {
	burgers.insertOne([
		"burger_name", "devoured"
		], [
		req.body.burger_name, false
		], function() {
			res.redirect("/");
		});
});
//updateOne
router.put("/:id", function (req, res) {
	var condition = "id = " + req.params.id;
	burgers.updateOne({
		devoured: req.body.devoured
	}, condition, function() {
		res.redirect("/");
	});
});

module.exports = router;