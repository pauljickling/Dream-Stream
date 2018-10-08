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
/*
for (let player in players) {
  console.log(players[player].name);
}
*/
// Twitch API Call
request(login, function(error, response, body) {
  if(error) {
    console.log(`Error: ${error}\n Status Code: ${response.statusCode}`);
  } else {
    let twitch = JSON.parse(body);
    nameSwitch();
    for (let stream of twitch.streams) {
      if (stream.channel.display_name in players.name) {
        console.log(stream.channel.display_name);
      }
    }



    // on left: twitch name, on right: valve name
    function nameSwitch() {
      for (let i of twitch.streams) {
        let name = i.channel.display_name;
        switch(name) {
          case "0Timado0": i.channel.display_name = "Timado";
          break;
          case "33dota": i.channel.display_name = "33";
          break;
          case "7ckngMad": i.channel.display_name = "7Mad-";
          break;
          case "ABFnggshka": i.channel.display_name = "Fng";
          break;
          case "ALOHADANCETV": i.channel.display_name = "ALOHADANCE";
          break;
          case "Attackerdota": i.channel.display_name = "!Attacker";
          break;
          case "Arteezy": i.channel.display_name = "rtz";
          break;
          case "BananaSlamJamma": i.channel.display_name = "BSJ";
          break;
          case "BigDaddy": i.channel.display_name = "BigDaddyN0tail";
          break;
          case "BlackDotATV": i.channel.display_name = "Black^";
          break;
          case "BlitzDotA": i.channel.display_name = "Blitz";
          break;
          case "BloodyNine": i.channel.display_name = "Bloody Nine";
          break;
          case "bryle_": i.channel.display_name = "Bryle";
          break;
          case "canceldota": i.channel.display_name = "canceL^^";
          break;
          case "CCnCDotA2": i.channel.display_name = "CCnC";
          break;
          case "Cr1tdota": i.channel.display_name = "Cr1t-";
          break;
          case "Dota2FATA": i.channel.display_name = "Fata";
          break;
          case "dotademon": i.channel.display_name = "DeMoN";
          break;
          case "DotACapitalist": i.channel.display_name = "Capitalist";
          break;
          case "Eosintrash": i.channel.display_name = "Eosin";
          break;
          case "EternaLEnVyy": i.channel.display_name = "EternaLEnVy";
          break;
          case "FearDarkness": i.channel.display_name = "Fear";
          break;
          case "febbydoto": i.channel.display_name = "Febby";
          break;
          case "forev": i.channel.display_name = "FoREv";
          break;
          case "fozzy4444": i.channel.display_name = "tv/fozzy4444";
          break;
          case "GGwpLanaya": i.channel.display_name = "GGwpLanaya Ift";
          break;
          case "Gorgcc": i.channel.display_name = "Gorgc";
          break;
          case "illidanstr": i.channel.display_name = "IllidanSTR";
          break;
          case "inK_Dota": i.channel.display_name = "@inKDota";
          break;
          case "k13sz": i.channel.display_name = "twitch.tv/k13sz";
          break;
          case "lanarinho": i.channel.display_name = "Larano";
          break;
          case "lizZardDota2": i.channel.display_name = "lizzard";
          break;
          case "MatthewDota": i.channel.display_name = "Matthew~";
          break;
          case "midone": i.channel.display_name = "MidOne";
          break;
          case "Miracle_doto": i.channel.display_name = "Miracle-";
          break;
          case "MiSeRyTheSLAYER": i.channel.display_name = "MiSeRy";
          break;
          case "MooDota2": i.channel.display_name = "Moo";
          break;
          case "Moonmeander": i.channel.display_name = "MoonMayMays";
          break;
          case "nooneboss": i.channel.display_name = "No[o]ne-";
          break;
          case "PurgeGamers": i.channel.display_name = "Purge";
          break;
          case "peterpandam": i.channel.display_name = "Peterpandam";
          break;
          case "ramzesdoto": i.channel.display_name = "RAMZES666";
          break;
          case "shuma4": i.channel.display_name = "ShuMa";
          break;
          case "Sing_sing": i.channel.display_name = "SingSing";
          break;
          case "slahserDota": i.channel.display_name = "slahser";
          break;
          case "smashdota": i.channel.display_name = "SmAsH";
          break;
          case "SneykingDota": i.channel.display_name = "Sneyking";
          break;
          case "SumaiLDoto": i.channel.display_name = "SumaiL";
          break;
          case "Sovereigndota": i.channel.display_name = "Sovereign";
          break;
          case "topsonous": i.channel.display_name = "Topson";
          break;
          case "universedota": i.channel.display_name = "Universe";
          break;
          case "vanNDota": i.channel.display_name = "vanN";
          break;
          case "w33haa": i.channel.display_name = "w33";
          break;
          case "WagamamaTV": i.channel.display_name = "Wagamama";
          break;
          case "YapzOrdota": i.channel.display_name = "YapzOr";
          break;
          case "y0nd.Alina": i.channel.display_name = "y0nd";
          break;
        }
      }
    }
  }
});
