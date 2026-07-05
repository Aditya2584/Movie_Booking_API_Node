const express = require("express");
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require("mongoose");
// const Movie = require("./models/movie.model");

env.config();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/home", (req, res)=>{
    console.log("Hitting /home")
    return res.json({
        success: true,
        message: "Fetched home"
    });
})

app.listen(process.env.PORT, async()=>{
    console.log(`Server started on PORT ${process.env.PORT}`);

    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Sucessfully connected to mongo");
        // await Movie.create({
        //     name: "Don 2",
        //     description: "Comedy",
        //     casts:["Sharukhan", "Priyanka Chopra"],
        //     director: "Rohit Shetty",
        //     trailerUrl:"google.com",
        //     language:"Hindi",
        //     releaseDate:"18-03-2022",
        //     releaseStatus: "Released"
        // });

    }catch(err){
        console.log("Not able to connect");
    }
   
})