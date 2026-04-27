const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* --------- CORS FIX --------- */

app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"]
}));

app.options("*", cors());

/* --------- BODY PARSER --------- */

app.use(express.json());

/* --------- DATABASE --------- */

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* --------- ROUTES --------- */

app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req,res)=>{
    res.send("StayMatch Backend Running");
});

/* --------- SERVER --------- */

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});