var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"), 
    Campground = require("./models/campground"), 
    seedDB = require("./seeds"), 
    Comment = require("./models/comment"), 
    passport = require("passport"),
    LocalStrategy = require("passport-local"), 
    User = require("./models/user"), 
    methodOverride = require("method-override"), 
    flash = require("connect-flash");
    
// requiring routes
var commentRoutes = require("./routes/comments"), 
    campgroundRoutes = require("./routes/campgrounds"), 
    indexRoutes = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v10"

mongoose.connect(url);
// mongoose.connect("mongodb://ahseo:password@ds153113.mlab.com:53113/yelpcamp_ahseo");
// mongodb://ahseo:password@ds153113.mlab.com:53113/yelpcamp_ahseo
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Sever has started");
});