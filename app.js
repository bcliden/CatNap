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
});

var Napspot = mongoose.model("Napspot", napspotSchema);

// var napspots = [
// 	{name: "Poplar Bluff", image: "/images/8699891266.png"},
// 	{name: "Cedar Creek", image: "/images/7358337100.png"},
// 	{name: "Terrace View", image: "/images/5999254837.png"},
//
// ];

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
				res.render("napspots", {napspots: allNapspots});
			};
		});
});

// CREATE
app.post("/napspots", function(req, res){
	//get data from form
	var name = req.body.name;
	var image = req.body.image;
	var newNapspot = {name: name, image: image};
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

app.get("/*", function(req, res){
	res.render("return");
});

//SERVER

app.listen(3000, function(){
	console.log("The CatNap server has started!");
});
