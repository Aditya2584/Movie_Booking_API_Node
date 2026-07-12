const express = require("express");
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require("mongoose");

const MovieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.route");

env.config();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

MovieRoutes(app);
theatreRoutes(app);

app.listen(process.env.PORT, async()=>{
    console.log(`Server started on PORT ${process.env.PORT}`);

    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Sucessfully connected to mongo");
    }catch(err){
        console.log("Not able to connect");
    }
   
})