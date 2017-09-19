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

// COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {napspot_id: req.params.id, comment: foundComment});
    };
  });
});

// COMENTS UPDATE ROUTE
router.put("/:comment_id", checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/napspots/" + req.params.id);
    };
  });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back")
    } else {
      res.redirect("/napspots/" + req.params.id)
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

function checkCommentOwnership(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      } else {
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect("back");
        };
      };
    });
  } else {
    res.redirect("back");
  };
};


module.exports = router;
