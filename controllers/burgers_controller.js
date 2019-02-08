//Our controller requires access to Express's router function and the burger.js model in order to set up our API routing
const express = require("express");
const burger = require("../models/burger.js");

//This is used to help with routing across multiple modules
const router = express.Router();

//Create the get, put, and post request functions using "router.get" etc.

router.get("/", function (req, res) {

    //The root page will show all the burgers in the database
    burger.all(function (data) {
        //Stores the data we receive as an object to pass to
        //our index Handlebars page.
        let dataObj = {
            burgers: data
        };
        //SHOW THE THINGS ON THE PAGE!!
        console.log(dataObj);
        res.render("index", dataObj);
    });
});

router.put("/api/burgers/:id", function (req, res) {

    let condition = "id = " + req.params.id;
    console.log(req.body.devoured);
    burger.update({devoured: req.body.devoured}, condition, function (result) {

        //If the id doesn't exist, then the burger doesn't exist. Send 404 error. Otherwise, good to go.
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


//Post request to add a new burger to the list using the create method in our burger model
router.post("/api/burgers", function(req, res){

    burger.create("burger_name", req.body.burger_name, function(result){
        //Show the id of the new burger
        res.json({id: result.insertId});
    });
})

//Exported to server.js so they can be used.
module.exports = router;