const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

name:{type:String,required:true},

email:{type:String,required:true,unique:true},

password:{type:String,required:true},

preferences:{
sleep:{type:Number,default:5},
clean:{type:Number,default:5},
noise:{type:Number,default:5},
study:{type:Number,default:5},
social:{type:Number,default:5},
smoking:{type:Number,default:0}
},

createdAt:{type:Date,default:Date.now}

});

module.exports = mongoose.model("User",userSchema);