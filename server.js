const express = require("express");

let PORT = process.env.PORT || 3000;

let app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let handlebars = require("express-handlebars");

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebar");

const routes = require("./conrollers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function () {
    console.log("Server listening on http://localhost:" + PORT);
});