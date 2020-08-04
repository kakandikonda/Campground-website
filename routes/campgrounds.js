var express = require("express");
var router = express.Router();
var Campground = require("../models/campground.js");

// campground root rout
router.get("/", function(req, res){
	//get all the campgrounds
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log("SOMETHING WENT WRONG");
		}else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	});
       
});
// creates new campground
router.post("/", function(req, res){
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
   Campground.create(newCampground, function(err, newlyCreated){
	   if(err){
		   console.log(err);
	   }else{
		   //redirect back to campgrounds page
		   res.redirect("/campgrounds");
	   }
   });
   
});
// displays form for new campground
router.get("/new", function(req, res) {
   res.render("campgrounds/new"); //new campground page 
});

// SHOW ROUTE - Shows information on a specific campground
router.get("/:id", function(req, res){
	//find campgrounds with provided provided id
	Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
	
});

module.exports = router;