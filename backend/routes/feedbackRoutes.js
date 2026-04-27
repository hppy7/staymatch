const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

router.post("/", async (req, res) => {

    try{

        const {user, roommate, rating, comment} = req.body;

        const feedback = new Feedback({
            user,
            roommate,
            rating,
            comment
        });

        await feedback.save();

        res.json({message:"Feedback submitted successfully"});

    }

    catch(err){
        res.status(500).json({error:"Failed to submit feedback"});
    }

});

module.exports = router;