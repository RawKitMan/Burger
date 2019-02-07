const express = require("express");

let PORT = process.env.PORT || 3000;

let app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let expresshb = require("express-handlebars");

app.engine("handlebars", expresshb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function () {
    console.log("Server listening on http://localhost:" + PORT);
});