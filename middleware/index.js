// all middleware here 

var Campground 			= require("../models/campground"),
    Comment 				= require("../models/comment")

	
	var  middlewareObj = {
	
	
}

middlewareObj.checkCommentOwner = function(req,res,next) {
	
	
	if(req.isAuthenticated()){
		
		Comment.findById(req.params.comment_id , (err,foundComment)=>{
      			  if(err)
        		    res.redirect("back");
       			  else {
			 			// does own ?
				
					  if(foundComment.author.id.equals(req.user._id))          
						next(); 
						else {
						  req.flash("error" , "You dont have permission")
							res.redirect("back");
							
						 }	}
		
	})    } 
	
	else {
		req.flash("error" , "You need to be logged in")
		res.redirect("back");
	}
	
}




middlewareObj.checkCampgroundOwner = function(req,res,next) {
	
	
	if(req.isAuthenticated()){
		
		Campground.findById(req.params.id , (err,foundCampground)=>{
      			  if(err){
					  req.flash("error" , "Not found")
        		    res.redirect("back");
				  }
       			  else {
			 			// does own ?
						if(foundCampground.author.id.equals(req.user._id))          
        					next(); 
        		    	 else {
							  req.flash("error" , "You dont have permission")
							res.redirect("back");
						 }
						 }	
		
	})    } 
	
	else {
			  req.flash("error" , "You need to be logged in")
		res.redirect("back");
	}
	
}


middlewareObj.isLoggedIn = function (req,res,next){
 	if(req.isAuthenticated())
 		return next();
	
	 req.flash("error" , "You need to be logged in")
 	res.redirect("/login")
 }





module.exports = middlewareObj