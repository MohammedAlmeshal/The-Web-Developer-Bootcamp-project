var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");


var UserSchema = new mongoose.Schema ({
	username: String,
	password: String

});

// After defiininng schema, adds methods to schema 
UserSchema.plugin(passportLocalMongoose);





module.exports = mongoose.model("User" , UserSchema)