//Import the ORM config file
const orm = require("../config/orm.js");

//Object containing all of the ORM methods to query the SQL database
const burger = {
    //Get all the burgers from the database
    all: function(cb){
        orm.selectAll("burgers", function(res){
            cb(res);
        });
    },

    //Create a new burger and put it into the table
    create: function(column, value, cb){
        orm.insertOne("burgers", [column], [value], function(res){
            cb(res);
        });
    },

    //Update a burger to go from devoured to not devoured (or vice versa)
    update: function(objColVal, condition, cb){
        orm.updateOne("burgers", objColVal, condition, function(res){
            cb(res);
        });
    }
};

//Exporting to burgers_controller.js
module.exports = burger;