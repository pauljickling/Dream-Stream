module.exports = function() {
  const fs = require('fs');
  const request = require('request');
  const getJson = require('./getjson.js');
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

  let streamers = []; // list of top tier players

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
        let streamer = new Streamer(points[i].name, 'unavilable', null, points[i].points);
        streamers.push(streamer);
        playerMap.set(points[i].name, streamers.length -1);
      }
    }
  }

  getPoints();

  let filteredPlayers = []; // when the streamer list is reduced it is pushed to this array
  let twitch = [];  // list from Twitch JSON request
  let cards = '';
  // Twitch API call
  request(login, function(error, response, body) {
    function filterList(arr) {
      fs.writeFile('./public/test_twitch.json', JSON.stringify(arr), 'UTF-8', (err) => {
        if (err) throw err;
      });
      for (let i=0; i < arr.length; i++) {
        if (playerMap.has(arr[i].name) === true) {
          streamers[playerMap.get(arr[i].name)].url = arr[i].url;
          streamers[playerMap.get(arr[i].name)].img = arr[i].img;
          streamers[playerMap.get(arr[i].name)].lang = arr[i].lang;
        }
      }
      reduceList(streamers);
      for (let p in filteredPlayers) {
        if (filteredPlayers[p].rank === undefined) {
          filteredPlayers[p].rank = 0;
        }
        if (filteredPlayers[p].points === undefined) {
          filteredPlayers[p].points = 0;
        }
        filteredPlayers[p].card = `<a href="${filteredPlayers[p].url}" class="${filteredPlayers[p].lang}"><div class="card"><img src="${filteredPlayers[p].img}" aria-label="logo for ${filteredPlayers[p].name}">
                                        <p><div class="player-title">${filteredPlayers[p].name}</div>
                                        Rank <span class="rank">${filteredPlayers[p].rank}</span><br>
                                        <span class="pointsRank">${filteredPlayers[p].points}</span> Qualifying Points</p>
                                        </div></a>\n`;
      }
      filteredPlayers.sort(function(a, b) {
        return (a.rank) - (b.rank);
      });
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
        case "33dota": twitch[i].name = "33";
        break;
        case "7ckngMad": twitch[i].name = "7Mad-";
        break;
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
        case "Dota2FATA": twitch[i].name = "Fata";
        break;
        case "dotademon": twitch[i].name = "DeMoN";
        break;
        case "DotACapitalist": twitch[i].name = "Capitalist";
        break;
        case "Eosintrash": twitch[i].name = "Eosin";
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
        case "Gorgcc": twitch[i].name = "Gorgc";
        break;
        case "illidanstr": twitch[i].name = "IllidanSTR";
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
        case "PurgeGamers": twitch[i].name = "Purge";
        break;
        case "peterpandam": twitch[i].name = "Peterpandam";
        break;
        case "qSnake": twitch[i].name = " ุqSnake";
        break;
        case "ramzesdoto": twitch[i].name = "RAMZES666";
        break;
        case "shuma4": twitch[i].name = "ShuMa";
        break;
        case "Sing_sing": twitch[i].name = "SingSing";
        break;
        case "slahserDota": twitch[i].name = "slahser";
        break;
        case "smashdota": twitch[i].name = "SmAsH";
        break;
        case "SneykingDota": twitch[i].name = "Sneyking";
        break;
        case "SumaiLDoto": twitch[i].name = "SumaiL";
        break;
        case "Sovereigndota": twitch[i].name = "Sovereign";
        break;
        case "universedota": twitch[i].name = "Universe";
        break;
        case "vanNDota": twitch[i].name = "vanN";
        break;
        case "w33haa": twitch[i].name = "w33";
        break;
        case "WagamamaTV": twitch[i].name = "Wagamama";
        break;
        case "YapzOrdota": twitch[i].name = "YapzOr";
        break;
        case "ZiftryDoto": twitch[i].name = "Ziftry";
        break;
        default: name = twitch[i].name;
        break;
      }
    }
  }
}
