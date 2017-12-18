module.exports = function() {
  const fs = require('fs');
  const request = require('request');
  const getJson = require('./getjson.js');
  const scrape = require('./scrape.js');
  const clientid = require('./clientid.js');

  const points = require('./public/points.json');
  const americas = require('./public/americas.json');
  const china = require('./public/china.json');
  const europe = require('./public/europe.json');
  const se_asia = require('./public/se_asia.json');

  // twitch api login
  const login = {
    url: 'https://api.twitch.tv/kraken/streams?limit=100&offset=0&game=DOTA+2',
    headers: {
      "Client-ID": clientid.clientId
    }
  };

  // need to add cards text to streamer class
  class Streamer {
    constructor(name, rank, mmr, points, url, img, lang, card) {
      this.name = name;
      this.rank = rank;
      this.mmr = mmr;
      this.points = points;
      this.url = url;
      this.img = img;
      this.lang = lang;
      this.card = card;
    }
  }

  let streamers = []; // list of top tier players, confusingly called streamers

  function getRegion(region) {
    for (let i=0; i < region.leaderboard.length; i++) {
      let streamer = new Streamer(region.leaderboard[i].name, i+1, region.leaderboard[i].solo_mmr);
      streamers.push(streamer);
      }
    }

  getRegion(americas);
  getRegion(china);
  getRegion(europe);
  getRegion(se_asia);

  let playerMap = new Map(); // player map where the value is the index of the players

  for (let i=0; i < streamers.length; i++) {
    playerMap.set(streamers[i].name, i);
  }

  function getPoints() {
    for (let i=0; i < points.length; i++) {
      if (playerMap.has(points[i].name) === true) {
        streamers[playerMap.get(points[i].name)].points = points[i].points;
      } else {
        let streamer = new Streamer(points[i].name, null, points[i].points);
        streamers.push(streamer);
        playerMap.set(points[i].name, streamers.length -1);
      }
    }
  }

  getPoints();

  let filteredPlayers = []; // streamers list reduced to
  let twitch = [];  // list from Twitch JSON request
  let cards = '';
  // Twitch API call
  request(login, function(error, response, body) {
  // nomenclature is a little weird. what does filterList mean vs reduceList?
    function filterList(arr) {
      for (let i=0; i < arr.length; i++) {
        if (playerMap.has(arr[i].name) === true) {
          streamers[playerMap.get(arr[i].name)].url = arr[i].url;
          streamers[playerMap.get(arr[i].name)].img = arr[i].img;
          streamers[playerMap.get(arr[i].name)].lang = arr[i].lang;
        }
      }
      reduceList(streamers);
  //    console.log(filteredPlayers[0].name);
      for (let p in filteredPlayers) {
        if (filteredPlayers[p].rank === undefined) {
          filteredPlayers[p].rank = 0;
        }
        if (filteredPlayers[p].points === undefined) {
          filteredPlayers[p].points = 0;
        }
        filteredPlayers[p].card = `<a href="${filteredPlayers[p].url}" class="${filteredPlayers[p].lang}"><div class="card"><img src="${filteredPlayers[p].img}">
                                        <p>${filteredPlayers[p].name}<br>
                                        Rank <span class="rank">${filteredPlayers[p].rank}</span><br>
                                        <span class="pointsRank">${filteredPlayers[p].points}</span> Qualifying Points</p>
                                        </div></a>\n`;
      }
      fs.writeFile('./public/dreamstream.json', JSON.stringify(filteredPlayers), 'UTF-8', (err) => {
        if (err) throw err;
      });
      for (let c in filteredPlayers) {
        cards = cards + filteredPlayers[c].card;
      }
      let cardsJson = { text: cards };

      fs.writeFile('./public/cards.json', JSON.stringify(cardsJson), 'UTF-8', (err) => {
        if (err) throw err;
      });
    }
  // says if there is no twitch url then don't bother including it on the list
    function reduceList(arr) {
      for (let i=0; i < arr.length; i++) {
        if (arr[i].url !== undefined) {
          filteredPlayers.push(arr[i]);
        }
      }
    }

    if (!error && response.statusCode == 200) {
      let live = JSON.parse(body);
      for (let i=0; i < live.streams.length; i++) {
        let stream = new Streamer(live.streams[i].channel.display_name, null, null, null, live.streams[i].channel.url, live.streams[i].channel.logo, live.streams[i].channel.broadcaster_language);
        twitch.push(stream);
      }
      nameSwitch();
      filterList(twitch);
    } else {
      console.log('Error: ' + error + ' Status code: ' + response.statusCode);
    }
  });

  // on left: twitch name, on right: valve name
  function nameSwitch() {
    for (let i=0; i < twitch.length; i++) {
      let name = twitch[i].name;
      switch(name) {
        case "ABFnggshka": twitch[i].name = "Fng";
        break;
        case "ALOHADANCETV": twitch[i].name = "ALOHADANCE";
        break;
        case "Attackerdota": twitch[i].name = "!Attacker";
        break;
        case "Arteezy": twitch[i].name = "rtz";
        break;
        case "BananaSlamJamma": twitch[i].name = "BSJ";
        break;
        case "BlackDotATV": twitch[i].name = "Black^";
        break;
        case "BlitzDotA": twitch[i].name = "Blitz";
        break;
        case "BloodyNine_": twitch[i].name = "Bloody Nine";
        break;
        case "bryle_": twitch[i].name = "Bryle";
        break;
        case "canceldota": twitch[i].name = "canceL^^";
        break;
        case "CCnCDotA2": twitch[i].name = "CCnC";
        break;
        case "Cr1tdota": twitch[i].name = "Cr1t-";
        break;
        case "dotademon": twitch[i].name = "DeMoN";
        break;
        case "DotACapitalist": twitch[i].name = "Capitalist";
        break;
        case "EternaLEnVyy": twitch[i].name = "EternaLEnVy";
        break;
        case "FearDarkness": twitch[i].name = "Fear";
        break;
        case "febbydoto": twitch[i].name = "Febby";
        break;
        case "forev": twitch[i].name = "FoREv";
        break;
        case "fozzy4444": twitch[i].name = "tv/fozzy4444";
        break;
        case "GGwpLanaya": twitch[i].name = "GGwpLanaya Ift";
        break;
        case "Illidanstrdoto": twitch[i].name = "Illidan";
        break;
        case "inK_Dota": twitch[i].name = "@inKDota";
        break;
        case "lanarinho": twitch[i].name = "Larano";
        break;
        case "midone": twitch[i].name = "MidOne";
        break;
        case "Miracle_doto": twitch[i].name = "Miracle-";
        break;
        case "MiSeRyTheSLAYER": twitch[i].name = "MiSeRy";
        break;
        case "MooDota2": twitch[i].name = "Moo";
        break;
        case "Moonmeander": twitch[i].name = "MoonMayMays";
        break;
        case "ramzesdoto": twitch[i].name = "RAMZES666";
        break;
        case "shuma4": twitch[i].name = "ShuMa";
        break;
        case "Sing_sing": twitch[i].name = "SingSing";
        break;
        case "slahserDota": twitch[i].name = "slahser";
        break;
        case "SumaiLDoto": twitch[i].name = "SumaiL";
        break;
        case "Sovereigndota": twitch[i].name = "Sovereign";
        break;
        case "universedota": twitch[i].name = "Universe";
        break;
        case "w33haa": twitch[i].name = "w33";
        break;
        case "WagamamaTV": twitch[i].name = "Wagamama";
        break;
        case "YapzOrdota": twitch[i].name = "YapzOr";
        break;
        default: name = twitch[i].name;
        break;
      }
    }
  }
}