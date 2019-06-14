var mongoose = require("mongoose");


var userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
	username: {type:String, required:true,},
	password:{type:String, required:true},
	email:{type:String, required:true},
	lastLogin:{type:Date,default:''},
	userType:{type:String},
	createdBy:{type:String,default:''}
});
userSchema.set('timestamps', true); // this will add createdAt and updatedAt timestamps
module.exports = mongoose.model("User",userSchema);