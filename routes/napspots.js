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
router.post("/", isLoggedIn, function(req, res){
	//get data from form req
	var name = req.body.name;
	var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
	var newNapspot = {name: name, image: image, description: description, author: author};
	Napspot.create(newNapspot, function(err, newNapspot){
		if(err){
			console.log(err);
		} else {
			res.redirect("/napspots");
		};
	});
});

// NEW
router.get("/new", isLoggedIn, function(req, res){
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

// EDIT ROUTE

router.get("/:id/edit", function(req, res){
  Napspot.findById(req.params.id, function(err, foundNapSpot){
    if(err){
      res.redirect("/napspots");
    } else {
      res.render("napspots/edit", {napspot: foundNapSpot});
    };
  });
});

// UPDATE ROUTE

router.put("/:id", function(req, res){
  // find and update the correct napspot
  Napspot.findByIdAndUpdate(req.params.id, req.body.napspot, function(err, updatedNapspot){
    if(err){
      res.redirect("/napspots");
    } else {
      res.redirect("/napspots/" + req.params.id)
    };
  });
  // redirect to show page
});

// DELETE ROUTE

router.delete("/:id", function(req, res){
  mongoose.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/napspots");
    } else {
      res.redirect("/napspots");
    };
  });
});

// MIDDLEWARE

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};

module.exports = router;
