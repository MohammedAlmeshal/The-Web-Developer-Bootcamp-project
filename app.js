var express     			= require("express"),
    app         			= express(),
    bodyParser	  			= require("body-parser"),
	methodOverride			= require("method-override"),
    mongoose  		   	    = require("mongoose"),
	passport			   	= require("passport"),
    LocalStrategy 			= require("passport-local"),
	 flash                   = require("connect-flash"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    Campground 				= require("./models/campground"),
    Comment 				= require("./models/comment"),
	User					= require("./models/user"),
 	seedDB					= require("./seed")
	




var	commentRoutes	 = require("./routes/comments"),
	campgroundsRoutes = require("./routes/campgrounds"),
	indexRoutes		 = require("./routes/index")
	




mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
 app.use(flash())
mongoose.set('useFindAndModify', false);

 // seedDB();


// PASSPORT config

app.use(require("express-session")({
	secret : "go search that ",
	resave: false,
	saveUninitialized : false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// to make it avalable to all
app.use((req,res,next) =>{
	res.locals.currentUser = req.user
     res.locals.error  = req.flash("error")
	res.locals.success  = req.flash("success")
	next();
})



    








app.use( "/" , indexRoutes)
app.use("/campgrounds/:id/comments" , commentRoutes)
app.use("/campgrounds", campgroundsRoutes)

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});