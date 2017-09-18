var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

// LANDING ROUTES

router.get("/", function(req, res){
	res.render("landing");
});

// AUTHENTICATION ROUTES

//REGISTER FORM
router.get("/signup", function(req, res){
  res.render("signup");
});

//HANDLES REGISTRATION
router.post("/signup", function(req, res){
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

//LOGIN FORM
router.get("/login", function(req, res){
  res.render("login");
});

//HANDLES LOGIN
router.post("/login",
  passport.authenticate("local",
    {
      successRedirect: "/napspots",
      failureRedirect: "/login"
    }), function(req, res){
  });

//LOGOUT
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/napspots");
});

// ERROR MSG
router.get("/*", function(req, res){
	res.render("error");
});

// MIDDLEWARE
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};

module.exports = router;
