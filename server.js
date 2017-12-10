const express = require("express");
const getJson = require('./getjson.js');
const scrape = require('./scrape.js');
const getStreamers = require('./getstreamers.js');
const bodyParser = require('body-parser');
const cards = require('./public/cards.json');

getJson();
scrape();

const app = express();

const handlebars = require("express-handlebars").create({
    defaultLayout:"main",
    helpers: {
      streamers: function() { return cards.text }
    }
  });
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  getStreamers();
  setInterval(function() {
    getStreamers();
  }, 300000);
  setInterval(function() {
    getJson();
  }, 1500000);
  next();
});
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/test", function(req, res) {
  res.render("test");
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
