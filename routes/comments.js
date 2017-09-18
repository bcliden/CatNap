var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Napspot = require("../models/napspot"),
    Comment = require("../models/comment");

//COMMENTS NEW
router.get("/new", isLoggedIn, function(req, res){
  //find napspot by ID
  Napspot.findById(req.params.id, function(err, foundNapSpot){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {napspot: foundNapSpot});
    };
  });
});

//COMMENTS CREATE
router.post("/", isLoggedIn, function(req, res){
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
          //add username + id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username
          comment.save();
          //save comment
          napspot.comments.push(comment);
          napspot.save();
          res.redirect("/napspots/" + napspot._id);
        };
      });
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
