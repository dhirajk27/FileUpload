const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

express.connect=()=> {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("DB connected successfully"))
        .catch((error)=>{
            console.log("DB connection issues");
            console.error(error);
            process.exit(1);
        });

};


