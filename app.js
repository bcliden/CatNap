var express 		= require("express"),
 		app 				= express(),
 		bodyParser 	= require("body-parser"),
		mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/catnap");
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

// SCHEMA

var napspotSchema = new mongoose.Schema({
	name: String,
	image: String,
  description: String
});

var Napspot = mongoose.model("Napspot", napspotSchema);

// var napspots = [
// 	{name: "Poplar Bluff", image: "/images/8699891266.png"},
// 	{name: "Cedar Creek", image: "/images/7358337100.png"},
// 	{name: "Terrace View", image: "/images/5999254837.png"},
//
// ];

// Napspot.create(
//   {
//     name: "Old World Station",
//     image: "/images/5982644976.png",
//     description: "A stately mansion for a lavish nap. Persian cat included."
//   }, function(err, napspot){
//     if(err){
//       console.log(err);
//     } else {
//       console.log("successfully added:")
//       console.log(napspot);
//     };
//   });


// ROUTES

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
	//get data from form
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
  Napspot.findById(req.params.id, function(err, foundNapSpot){
    if(err){
      console.log(err);
    } else {
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
