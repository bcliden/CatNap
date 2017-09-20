var express 		  = require("express"),
 		app           = express(),
 		bodyParser    = require("body-parser"),
    passport      = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
		Napspot       = require("./models/napspot"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    flash         = require("connect-flash"),
    seedDB        = require("./seeds");

// REQUIRING ROUTES
var commentRoutes = require("./routes/comments"),
    napspotRoutes = require("./routes/napspots"),
    indexRoutes   = require("./routes/index");

// DATABASE
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catnap");

// UNCOMMENT TO SEED DB ON INIT
// seedDB();

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG
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

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

// ROUTING
app.use("/napspots/:id/comments", commentRoutes);
app.use("/napspots", napspotRoutes);
app.use(indexRoutes);

// SERVER
app.listen(3000, function(){
	console.log("The CatNap server has started!");
});
