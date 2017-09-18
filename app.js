var express 		  = require("express"),
 		app           = express(),
 		bodyParser    = require("body-parser"),
    passport      = require("passport"),
    localStrategy = require("passport-local"),
		Napspot       = require("./models/napspot"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");

// DATABASE
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catnap");

//UNCOMMENT TO SEED DB
//seedDB();

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "Secret passphrase here",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ========== // ROUTES // ========== //


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
				res.render("napspots/index", {napspots: allNapspots});
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
	res.render("napspots/new")
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
      res.render("napspots/show", {napspot: foundNapSpot});
    };
  });
});

// ========== // COMMENTS ROUTES // ========== //

//NEW
app.get("/napspots/:id/comments/new", function(req, res){
  //find napspot by ID
  Napspot.findById(req.params.id, function(err, foundNapSpot){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {napspot: foundNapSpot});
    };
  });
});


//CREATE
app.post("/napspots/:id/comments", function(req, res){
  Napspot.findById(req.params.id, function(err, napspot){
    if(err){
      console.log(err);
      res.redirect("/napspots")
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err)
          res.redirect("/napspots");
        } else {
          napspot.comments.push(comment);
          napspot.save();
          res.redirect("/napspots/" + napspot._id);
        };
      });
    };
  });
});

// AUTHENTICATION ROUTES

app.get("/signup", function(req, res){
  res.render("signup");
});

app.post("/signup", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("signup")
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/napspots");
    })
  });
});

app.get("/login", function(req, res){
  res.render("login");
});

app.post("/login",
  passport.authenticate("local",
    {
      successRedirect: "/napspots",
      failureRedirect: "/login"
    }), function(req, res){
  });

// ERROR MSG

app.get("/*", function(req, res){
	res.render("error");
});


// SERVER
app.listen(3000, function(){
	console.log("The CatNap server has started!");
});
