//Import the ORM config file
const orm = require("../config/orm.js");
console.log(orm);

//Object containing all of the ORM methods to query the SQL database
const burger = {
    all: function(cb){
        orm.selectAll("burgers", function(res){
            cb(res);
        });
    },

    create: function(column, value, cb){
        orm.insertOne("burgers", [column], [value], function(res){
            cb(res);
        });
    },

    update: function(objColVal, condition, cb){
        orm.updateOne("burgers", objColVal, condition, function(res){
            cb(res);
        });
    }
};

//Exporting to burgers_controller.js
module.exports = burger;