var express = require("express");
    router  = express.Router()
    Napspot = require("../models/napspot");

// INDEX
router.get("/", function(req, res){
		//get all napspots from DB
		Napspot.find({}, function(err, allNapspots){
			if(err){
				console.log(err);
			} else {
				res.render("napspots/index", {napspots: allNapspots, currentUser: req.user});
			};
		});
});

// CREATE
router.post("/", function(req, res){
	//get data from form req
	var name = req.body.name;
	var image = req.body.image;
  var description = req.body.description;
	var newNapspot = {name: name, image: image, description: description};
	Napspot.create(newNapspot, function(err, newNapspot){
		if(err){
			console.log(err);
		} else {
			res.redirect("/napspots");
		};
	});
});

// NEW
router.get("/new", function(req, res){
	res.render("napspots/new")
});

// SHOW
router.get("/:id", function(req, res){
//find the napspot with the provided ID
  Napspot.findById(req.params.id).populate("comments").exec(function(err, foundNapSpot){
    if(err){
      console.log(err);
    } else {
      console.log(foundNapSpot);
      // render show template with that napspot
      res.render("napspots/show", {napspot: foundNapSpot});
    };
  });
});

module.exports = router;
