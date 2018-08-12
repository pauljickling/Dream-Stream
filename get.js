const fs = require('fs');
const request = require('request');
const clientid = require('./clientid.js');

const americas = require('./public/americas.json');
const china = require('./public/china.json');
const europe = require('./public/europe.json');
const se_asia = require('./public/se_asia.json');

// Twitch API login
const login = {
  url: 'https://api.twitch.tv/kraken/streams?limit=100&offset=0&game=DOTA+2',
  headers: {
    "Client-ID": clientid.clientId
  }
};

class Player {
  constructor(name, rank, url, img, lang, card) {
    this.name = name;
    this.rank = rank;
    this.url = url;
    this.img = img;
    this.lang = lang;
    this.card = card;
  }
}

let players = [];
let streamers = [];
let cards = '';

function getRegion(region) {
  rank = 1;
  for (let i in region.leaderboard) {
    let player = new Player(region.leaderboard[i].name, rank);
    players.push(player);
    rank++;
  }
}

getRegion(americas);
getRegion(china);
getRegion(europe);
getRegion(se_asia);

request(login, function(error, response, body) {
    if (!error && response.statusCode == 200) {
     let twitch = JSON.parse(body);
     for (let i in twitch.streams) {
       let streamer = new Player(twitch.streams[i].channel.display_name, null, twitch.streams[i].channel.url, twitch.streams[i].channel.logo, twitch.streams[i].channel.broadcaster_language);
       streamers.push(streamer);
     }
    }
});
