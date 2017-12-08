const express = require("express");
const getJson = require('./getjson.js');
const scrape = require('./scrape.js');
const getStreamers = require('./getstreamers.js');
const helper = require('./helper.js');
const bodyParser = require('body-parser');
const testJson = require('./public/test.json');
const fs = require('fs');
// fake json data for testing purposes
// const fake = require('./public/fake.json');

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

app.use(function(req,res,next){
  var _send = res.send;
  var sent = false;
  res.send = function(data){
    if(sent) return;
    _send.bind(res)(data);
    sent = true;
};
  next();
});

/* do i even want this?
app.use(function (req, res, next) {
  setInterval(function() {
    getStreamers();
    helper();
  }, 300000);
  setInterval(function() {
    getJson();
  }, 1500000);
  next();
});
*/
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/test", function(req, res) {
  res.render("test");
});
// API GET Request that writes JSON file to current state
app.get('/api', function(req, res) {
  res.json(testJson);
  fs.writeFile('./public/test.json', JSON.stringify(testJson), 'UTF-8', (err) => {
    if (err) throw err;
  });
});

// API PUT Request Updates JSON with current data
app.put('/api/', function(req, res) {
  console.log(res.body);
// let update = whatever the file passes to the Request
/*
  let testObject = {
    rank: 1,
    name: "Paul",
    solo_mmr: 10013,
    points: 2750,
    isStreaming: false,
    url: "pauljickling.com",
    img: "not a string",
    lang: "it"
  };
  res.send(testJson.leaderboard[1] = testObject);*/
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
