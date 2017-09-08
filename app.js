var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

var napspots = [
	{name: "Poplar Bluff", image: "/images/8699891266.png"},
	{name: "Cedar Creek", image: "/images/7358337100.png"},
	{name: "Terrace View", image: "/images/2248805448.png"},
];

// ROUTES

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/napspots", function(req, res){
		res.render("napspots", {napspots: napspots});
});

app.post("/napspots", function(req, res){
	//get data from form
	var name = req.body.name;
	var image = req.body.image;
	var newNapspot = {name: name, image: image};
	//add to napspot array
	napspots.push(newNapspot);
	//redir to /napspots page
	res.redirect("/napspots")
});

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
