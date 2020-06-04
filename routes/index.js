var express    	= require("express"),
	router		= express.Router();

var passport = require("passport"),
    User	 = require("../models/user")




router.get("/", function(req, res){
    res.render("landing");
});



// ===========================
// Auth
// ==========================

router.get("/register", (req,res) => {
	res.render("register")
})

//hnadel signup logic
router.post("/register", (req,res) => {
	var newUser = new User({username : req.body.username})
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			 return res.render("register", {"error": err.message});
		}
		passport.authenticate("local")( req ,res, () =>{
			req.flash("success" , "Welcome to YelpCamp "+ user.username )
			res.redirect("/campgrounds")
		})
		
	})
})

// login logic

router.get("/login", (req,res) => {
	res.render("login" )
})

router.post("/login",passport.authenticate("local", 
										{successRedirect: "/campgrounds",
										failureRedirect: "/login"
										}), (req,res) => {

})



// log out logic

router.get("/logout", (req,res) => {
	
	req.logout();
	 req.flash("success" , "Logged you out!")
		res.redirect("/campgrounds")
})




module.exports = router;



