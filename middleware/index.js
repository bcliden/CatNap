var Napspot = require("../models/napspot"),
    Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  };
  req.flash("error", "You must be logged in to do that.");
  res.redirect("/login");
};

middlewareObj.checkNapspotOwnership = function(req, res, next){
    if(req.isAuthenticated()){
      Napspot.findById(req.params.id, function(err, foundNapspot){
        if(err){
          req.flash("error", "Couldn't find that spot.")
          res.redirect("back");
        } else {
          if(foundNapspot.author.id.equals(req.user._id)){
            next();
          } else {
            req.flash("error", "You don't have permission to do that.")
            res.redirect("back");
          };
        };
      });
    } else {
      req.flash("error", "You need to be logged in to do that");
      res.redirect("back");
    };
  };

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
          res.redirect("back");
        } else {
          if(foundComment.author.id.equals(req.user._id)){
            next();
          } else {
            req.flash("error", "You don't have permission to do that.");
            res.redirect("back");
          };
        };
      });
    } else {
      req.flash("error", "You need to be logged in to do that.")
      res.redirect("back");
    };
  };

module.exports = middlewareObj
