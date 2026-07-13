const express = require("express");
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require("mongoose");

const MovieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.route");
const authRoutes = require("./routes/auth.routes");

env.config();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.set('debug', true)

MovieRoutes(app); //invoking Movies Routes
theatreRoutes(app); //invoking Theatre Routes
authRoutes(app); //invoking Auth Routes

app.listen(process.env.PORT, async()=>{
    console.log(`Server started on PORT ${process.env.PORT}`);

    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Sucessfully connected to mongo");
    }catch(err){
        console.log("Not able to connect");
    }
   
})