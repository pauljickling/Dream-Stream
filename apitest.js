const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bear = require('./models/bear');

const app = express();
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

app.use(bodyParser.urlencoded({ extended: true }));
// this is useful
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// API ROUTES

const router = express.Router();

// A WAY TO TRACK ALL KINDS OF DATA IF YOU ARE INTO THAT SORT OF THING
router.use(function(req, res, next) {
  console.log('Something is happening. * eerie twin peaks music * ');
  next();
});

// ROOT
router.get('/', function(req, res) {
  // could include an external json file here
  res.json({ message: 'welcome to the api, dork'});
});

// this stuff didn't work because the address for the mongoose.connect command is no good
// API POST
router.route('/bears').post(function(req, res) {
  let bear = new Bear();
  bear.name = req.body.name;
  // Also includes a save
  bear.save(function(err) {
    if (err) {
      res.send(err);
    }
  });
});

app.use('/api', router);

app.listen(port);
console.log('Server started up on port: ', port);
