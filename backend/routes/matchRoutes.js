const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req,res)=>{

try{

const {userPrefs} = req.body;

const allUsers = await User.find();

const scores = allUsers.map(person=>{

const p = person.preferences || {
sleep:5,
clean:5,
noise:5,
study:5,
social:5,
smoking:0
};

const diff =
Math.abs(userPrefs.sleep - p.sleep) +
Math.abs(userPrefs.clean - p.clean) +
Math.abs(userPrefs.noise - p.noise) +
Math.abs(userPrefs.study - p.study) +
Math.abs(userPrefs.social - p.social) +
(userPrefs.smoking !== p.smoking ? 5 : 0);

const compatibility = Math.max(0,100 - diff*2);

return {
name:person.name,
score:Math.round(compatibility),
preferences:p
};

});

res.json(scores.sort((a,b)=>b.score-a.score).slice(0,10));

}catch(err){
res.status(500).json({error:err.message});
}

});

module.exports = router;