
var express    	= require("express"),
	router		= express.Router({mergeParams : true});

var Campground = require("../models/campground")
var Comment = require("../models/comment")
var middleware = require("../middleware")





router.get("/new", middleware.isLoggedIn , function(req,res ){
	Campground.findById( req.params.id , function(err,campground){
		if(err)
			console.log(err)
		else
		res.render("comments/new" , { campground : campground}  )	
	})
	
})
// comment create 
router.post("/" , middleware.isLoggedIn, function(req,res){
	
	Campground.findById( req.params.id , function(err,campground){
		
		if(err)
			res.redirect("/campground")
		else {
	
		Comment.create(req.body.comment , function(err,comment){
		
		if(err){
				console.log(err)
			req.flash("error" , "Somthing went wrong")
		}
		else {
			  comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               campground.comments.push(comment);
               campground.save();
               req.flash("success" , "Successfuly added comment")
			res.redirect("/campgrounds/"+ campground._id)	
		}
	         	   
					   });
			
		}
	
	});
});


// EDIT 

router.get("/:comment_id/edit", middleware.checkCommentOwner,  (req,res) => {
	Comment.findById(req.params.comment_id , (err,foundComment) =>{
		if(err)
			res.redirect("back")
		else
		res.render("comments/edit", { campground_id : req.params.id , comment : foundComment})
	})

})

// update 

router.put("/:comment_id" , middleware.checkCommentOwner , (req,res) =>{


	Comment.findByIdAndUpdate(req.params.comment_id , req.body.comment , (err, updatedComment) =>{
		if(err)
			res.send("back")
		else
		res.redirect("/campgrounds/"+ req.params.id)
		
		
	} )
})

router.delete("/:comment_id" , middleware.checkCommentOwner , (req , res) => {
	Comment.findByIdAndRemove( req.params.comment_id , (err) => {
		if(err)
			res.redirect("back")
		else{
		 req.flash("success" , "Comment deleted")
		res.redirect("/campgrounds/"+ req.params.id )
		}
		})
})

// middeleware 





module.exports = router;