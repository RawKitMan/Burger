const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();

//Create the get, put, update, and delete routes (as needed) using "router.get" etc.

router.get("/", function(req,res){

    //The root page will show all the burgers in the database
    burger.all(function(data){
        //Stores the data we receive as an object to pass to
        //our index Handlebars page.
        let dataObj = {
            burgers: data
        };
        //SHOW THE THING
        res.render("index", dataObj);
    });
})
module.exports = router;