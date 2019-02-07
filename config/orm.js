const connection = require("./connection.js");


//questionMarks and objectToSQL are helper functions designed to help with creating the query string we need to access the SQL database. These functions also help prevent SQL injection.
function questionMarks(num) {
    //First we create an empty array to store the '?'s
    let arr = [];
    //We want two question marks for columns and one question mark for values
    for (let i = 0; i < num; i++) {
        arr.push("?");
    };

    //Convert the array into a string and return it to our INSERT query
    return arr.toString();
};

function objectToSQL(obj) {
    //Empty array to start
    let arr = [];

    //Loops through each property in an object and converts the property and value into a string
    for (let key in obj) {
        value = obj[key];

        //If the property exists in the object, get the value and convert it into a string.
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            };
        };
        //Push the created strings into the array
        arr.push(key + " = " + value);
    };

    //Convert the array into a string and return it. This will be used for our UPDATE query/.
    return arr.toString();
};

//Now to our ORM methods that our burger.js model will access. Each method has an SQL query which will execute a callback function to address any asynchronous issues that may occur.
const orm = {
    //Shows all the burgers in the database
    selectAll: function (table, cb) {
        let query = "SELECT * FROM " + table + ";";

        connection.query(query, function (err, result) {
            if (err) throw err;
            //After the query is made, execute the callback function.
            cb(result);
        });
    },
    insertOne: function (table, colArr, valArr, cb) {
        let query = "INSERT INTO " + table;
        query += " ( " + colArr.toString() + ") ";
        query += "VALUES (" + questionMarks(valArr.length) + ")";

        console.log(query);

        connection.query(query, valArr, function (err, result) {
            if (err) throw (err);
            cb(result);
        });
    },
    updateOne: function (table, colsObj, condition, cb) {
        let query = "UPDATE " + table;
        query += " SET " + objectToSQL(colsObj);
        query += " WHERE " + condition;

        console.log(query);

        connection.query(query, function(err, result){
            if(err) throw err;
            cb(result);
        });
    }
};

// Exports to burger.js
module.exports = orm;