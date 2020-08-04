var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");


var Campground = require("./models/campground.js");
var seedDB = require("./seeds");
var Comment = require("./models/comment.js");
var User = require("./models/user.js");

var campgroundRoutes = require("./routes/campgrounds.js");
var commentsRoutes = require("./routes/comments.js");
var indexRoutes = require("./routes/index.js");

// seedDB(); // seeds database (not in use right now)

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "this is the secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/campgrounds", campgroundRoutes);



var port = 3000;

app.listen(port, function () {
    console.log("server is running on port " + port);
	console.log("SERVER HAS STARTED!!!!!");
});