const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/signup", async (req,res)=>{

const {name,email,password} = req.body;

try{

const existing = await User.findOne({email});

if(existing){
return res.status(400).json({error:"User already exists"});
}

const hashed = await bcrypt.hash(password,10);

const user = new User({
name,
email,
password:hashed
});

await user.save();

res.json({message:"User registered successfully"});

}catch(err){
res.status(500).json({error:"Server error"});
}

});


router.post("/login", async (req,res)=>{

const {email,password} = req.body;

try{

const user = await User.findOne({email});

if(!user){
return res.status(401).json({error:"Invalid credentials"});
}

const valid = await bcrypt.compare(password,user.password);

if(!valid){
return res.status(401).json({error:"Invalid credentials"});
}

const token = jwt.sign(
{id:user._id},
process.env.JWT_SECRET,
{expiresIn:"2h"}
);

res.json({
token,
name:user.name
});

}catch(err){
res.status(500).json({error:"Server error"});
}

});

module.exports = router;