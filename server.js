
//Server needs access to Express module
const express = require("express");

//Sets our port.
let PORT = process.env.PORT || 3000;

//Variable to handle middleware and Handlebars
let app = express();

//Ensures the files in the public folder are served
app.use(express.static("public"));

//Middleware to handle JSON objects
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Access and use Handlebars for our HTML
let expresshb = require("express-handlebars");
app.engine("handlebars", expresshb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Get our API routes and use them
const routes = require("./controllers/burgers_controller.js");
app.use(routes);

//Start our server
app.listen(PORT, function () {
    console.log("Server listening on http://localhost:" + PORT);
});