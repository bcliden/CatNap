var express 		= require("express"),
 		app 				= express(),
 		bodyParser 	= require("body-parser"),
		Napspot     = require("./models/napspot"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");

// DATABASE
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catnap");
seedDB();

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


// // ROUTES // //


app.get("/", function(req, res){
	res.render("landing");
});

// INDEX
app.get("/napspots", function(req, res){
		//get all napspots from DB
		Napspot.find({}, function(err, allNapspots){
			if(err){
				console.log(err);
			} else {
				res.render("index", {napspots: allNapspots});
			};
		});
});

// CREATE
app.post("/napspots", function(req, res){
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
app.get("/napspots/new", function(req, res){
	res.render("new")
});

// SHOW
app.get("/napspots/:id", function(req, res){
//find the napspot with the provided ID
  Napspot.findById(req.params.id).populate("comments").exec(function(err, foundNapSpot){
    if(err){
      console.log(err);
    } else {
      console.log(foundNapSpot);
      // render show template with that napspot
      res.render("show", {napspot: foundNapSpot});
    };
  });
});

app.get("/*", function(req, res){
	res.render("return");
});


// SERVER
app.listen(3000, function(){
	console.log("The CatNap server has started!");
});
