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
  res.render("signup", {page: "signup"});
});

//HANDLES REGISTRATION
router.post("/signup", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      req.flash("error", err.message);
      return res.redirect("signup");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to CatNap, " + req.body.username + "!");
      res.redirect("/napspots");
    })
  });
});

//LOGIN FORM
router.get("/login", function(req, res){
  res.render("login", {page: "login"});
});

//HANDLES LOGIN
router.post("/login",
  passport.authenticate("local",
    {
      successRedirect: "/napspots",
      failureRedirect: "/login",
      successFlash: "Welcome!",
      failureFlash: "Invalid username or password.",
    }), function(req, res){
  });

//LOGOUT
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged you out!")
  res.redirect("/napspots");
});

// ERROR MSG
router.get("/*", function(req, res){
	res.render("error");
});

module.exports = router;
