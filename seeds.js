var mongoose = require("mongoose"),
    Napspot = require("./models/napspot"),
    Comment = require("./models/comment");

var data = [
  {
    name: "Cozy Corner",
    image: "https://unsplash.com/photos/EbivdbB83Y0/download?force=true",
    description: "Probably too cozy for the likes of you.",
  },
  {
    name: "Napville Xpress",
    image: "https://unsplash.com/photos/iecsDu416PE/download?force=true",
    description: "Nap here like a true urbanite."
  },
  {
    name: "Beatrix Place",
    image: "https://unsplash.com/photos/evoEeSj_klo/download?force=true",
    description: "High class, high expectations, high price"
  }
];


function seedDB(){
  //remove all napspots
  Napspot.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
    console.log("Removed all napspots!");
    //add some napspots
    data.forEach(function(seed){
      Napspot.create(seed, function(err, napspot){
        if(err){
          console.log(err);
        } else {
          console.log("Added a napspot")
          //add some comments
          Comment.create(
            {
              text: "Pretty nice but covered in cat hair",
              author: "Terrence"
            }, function(err, comment){
              if(err){
                console.log(err);
              } else {
                napspot.comments.push(comment);
                napspot.save();
                console.log("new comment added");
              };
            });
        };
      });
    });
    };
  });
};

module.exports = seedDB;
