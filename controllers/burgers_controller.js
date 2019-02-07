const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();

//Create the get, put, post, and delete routes (as needed) using "router.get" etc.

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

router.post("/api/burgers", function(req, res){

    burger.create("burger_name", req.body.burger_name, function(result){
        res.json({id: result.insertId});
    });
})


module.exports = router;