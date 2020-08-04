var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");

// ==================================
// COMMENTS ROUTES
// ==================================
// New Comment
router.get("/new", isLoggedIn, function (req, res) {
    // 	Find campground by ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }
    });
});
// creates comment
router.post("/", isLoggedIn, function (req, res) {
    // 	look up by ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // 	create new comment
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    // save comment
                    // 	connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // 	redirect to campground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	else{
		res.redirect("/login");
	}
}

module.exports = router;