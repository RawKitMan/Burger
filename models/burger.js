//Import the ORM config file
const orm = ("../config/orm.js");

//Object containing all of the ORM methods to query the SQL database
const burger = {
    all: function(cb){
        orm.selectAll("burgers", function(res){
            cb(res);
        });
    },

    create: function(columns, values, cb){
        orm.insertOne("burgers", columns, values, function(res){
            cb(res);
        });
    },

    update: function(columns, condition, cb){
        orm.updateOne("burgers", columns, condition, function(res){
            cb(res);
        });
    }
};

//Exporting to burgers_controller.js
module.exports = burger;