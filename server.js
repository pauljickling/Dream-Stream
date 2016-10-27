var express = require("express");
var fs = require("fs");
var request = require("request");
var collectdata = require("./collectdata.js");
var americas = require("./americas.js");
var china = require("./china.js");
var europe = require("./europe.js");
var se_asia = require("./se_asia.js");

americas();
china();
europe();
se_asia();

var app = express();

var handlebars = require("express-handlebars").create({
    defaultLayout:"main",
    helpers: {
      section: function(name, options) {
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      }
    }
  });
    app.engine("handlebars", handlebars.engine);
    app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));

app.use( function (req, res, next) {
  collectdata();
  setInterval(function() {
    collectdata();
  }, 300000);
  next();
});

app.get("/", function(req, res) {
  res.render("home");
});

// custom 404 page
app.use(function(req, res, next) {
  res.status(404);
  res.render("404");
});

// custom 500 page
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

// server run
app.listen(app.get("port"), function() {
  console.log("Express started on http://localhost:" +
  app.get("port") + "; press ctrl-c to terminate.");
});
