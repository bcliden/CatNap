var mongoose = require("mongoose"),
    Napspot = require("./models/napspot"),
    Comment = require("./models/comment");

var data = [
  {
    name: "Cozy Corner",
    image: "https://unsplash.com/photos/EbivdbB83Y0/download?force=true",
    description: "Probably too cozy for the likes of you. Cat ipsum dolor sit amet, sniff other cat's butt and hang jaw half open thereafter. Sit on human. Meow all night where is my slave? I'm getting hungry always hungry hunt by meowing loudly at 5am next to human slave food dispenser. Then cats take over the world bathe private parts with tongue then lick owner's face hide when guests come over eat a plant, kill a hand. Cat slap dog in face scratch the furniture yet my left donut is missing, as is my right stare at the wall, play with food and get confused by dust."
  },
  {
    name: "Napville Xpress",
    image: "https://unsplash.com/photos/iecsDu416PE/download?force=true",
    description: "Nap here like a true urbanite. Cough hairball on conveniently placed pants steal the warm chair right after you get up, love to play with owner's hair tie or stare at the wall, play with food and get confused by dust. Hide at bottom of staircase to trip human spend all night ensuring people don't sleep sleep all day hate dog pelt around the house and up and down stairs chasing phantoms eat from dog's food curl into a furry donut yet lick arm hair."
  },
  {
    name: "Beatrix Place",
    image: "https://unsplash.com/photos/evoEeSj_klo/download?force=true",
    description: "High class, high expectations, high price. Throw down all the stuff in the kitchen kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff or mew but find empty spot in cupboard and sleep all day, walk on car leaving trail of paw prints on hood and windshield. Have my breakfast spaghetti yarn relentlessly pursues moth."
  }
];


function seedDB(){
  //remove all comments
  Comment.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Removed all comments!");
    };
  });
  //remove all napspots
  Napspot.remove({}, function(err){
    // if(err){
    //   console.log(err);
    // } else {
    // console.log("Removed all napspots!");
    // //add some napspots
    // data.forEach(function(seed){
    //   Napspot.create(seed, function(err, napspot){
    //     if(err){
    //       console.log(err);
    //     } else {
    //       console.log("Added a napspot")
    //       //add some comments
    //       Comment.create(
    //         {
    //           text: "Pretty nice but covered in cat hair",
    //           author: "Terrence"
    //         }, function(err, comment){
    //           if(err){
    //             console.log(err);
    //           } else {
    //             napspot.comments.push(comment);
    //             napspot.save();
    //             console.log("new comment added");
    //           };
    //         });
    //     };
    //   });
    // });
    // };
  });
};

module.exports = seedDB;
