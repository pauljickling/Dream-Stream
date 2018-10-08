const fs = require('fs');
const request = require('request');
const getJson = require('./getjson.js');
const clientid = require('./clientid.js');

const americas = require('./public/americas.json');
const china = require('./public/china.json');
const europe = require('./public/europe.json');
const se_asia = require('./public/se_asia.json');

// Consider using more current API format
const login = {
  url: 'https://api.twitch.tv/kraken/streams?limit=100&offset=0&game=DOTA+2',
  headers: {
    "Client-ID": clientid.clientId
  }
};

class Streamer {
  constructor(name, rank, region) {
    this.name = name;
    this.rank = rank;
    this.region = region;
  }
  addUrl(url) {
    this.url = url;
  }
  addImg(img) {
    this.img = img;
  }
  addLang(lang) {
    this.lang = lang;
  }
}

let players = []; // list of top tier players

function getRegion(region, regionName) {
  for (let i of region.leaderboard) {
    let streamer = new Streamer(i.name, i.rank, regionName);
    players.push(streamer);
  }
}

getRegion(americas, 'Americas');
getRegion(china, 'China');
getRegion(europe, 'Europe');
getRegion(se_asia, 'Southeast Asia');

request(login, function(error, response, body) {
  if(error) {
    console.log(`Error: ${error}\n Status Code: ${response.statusCode}`);
  } else {
    let streams = JSON.parse(body);
    console.log(streams.streams);
  }
});
