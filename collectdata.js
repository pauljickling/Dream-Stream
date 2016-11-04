module.exports = function() {

var fs = require("fs");
var request = require("request");
var americas = require("./public/americas.json");
var china = require("./public/china.json");
var europe = require("./public/europe.json");
var se_asia = require("./public/se_asia.json");

var login = {
  url: "https://api.twitch.tv/kraken/streams?limit=100&offset=0&game=DOTA+2",
  headers: {
    "Client-ID": // Client ID goes here
  }
};

// creates an array containing objects with all the relevant values
function arrToObject(output, input1, input2) {
  for (var i=0; i < input1.length; i++) {
    output[i] = {name: input1[i],
                mmr: input2[i],
                twitchUrl: null,
                logo: null};
  }
}
// after the array has been filtered this removes any empty values from the array
function clearArray(arr) {
  for (var i= arr.length; i > -1; i--) {
    if (arr[i] === "") {
      arr.splice(i, 1);
    }
  }
}
// creates a list that only contains players from the leaderboard currently streaming
function finalList() {
  for (var i=0; i < masterList.length; i++) {
    if (masterList[i].twitchUrl !== null) {
      complete.push(masterList[i]);
    }
  }
}
// collects MMR values from the DOTA 2 leaderboards
function getMmr(region) {
  for (var i=0; i < region.leaderboard.length; i++) {
    totalMmr.push(region.leaderboard[i].solo_mmr);
  }
}
// collects name values from the DOTA 2 leaderboards
function getName(region) {
  for (var i=0; i < region.leaderboard.length; i++) {
    totalPlayers.push(region.leaderboard[i].name);
  }
}
// adds the twitchUrl and logo values to the master list array
function getTwitchUrl() {
  for (var x=0; x < filteredPlayers.length; x++) {
    var y = totalPlayers.indexOf(filteredPlayers[x]);
    var z = streamers.indexOf(filteredPlayers[x]);
    masterList[y].twitchUrl = twitchUrls[z];
    masterList[y].logo = logos[z];
  }
}
// some players have different twitch and DOTA 2 handles. This is a manual remedy.
function nameSwitch() {
  for (var x=0; x < streamers.length; x++) {
    var name = streamers[x];
    switch(name) {
      case "ABFnggshka": streamers[x] = "Fng";
      break;
      case "ALOHADANCETV": streamers[x] = "ALOHADANCE";
      break;
      case "Attackerdota": streamers[x] = "!Attacker";
      break;
      case "Arteezy": streamers[x] = "rtz";
      break;
      case "BananaSlamJamma": streamers[x] = "BSJ";
      break;
      case "blackdotatv": streamers[x] = "Black^";
      break;
      case "BloodyNine_": streamers[x] = "Bloody Nine";
      break;
      case "canceldota": streamers[x] = "canceL^^";
      break;
      case "CCnCDotA2": streamers[x] = "CCnC";
      break;
      case "Cr1tdota": streamers[x] = "Cr1t-";
      break;
      case "EternalEnVyy": streamers[x] = "EternalEnvy";
      break;
      case "forev": streamers[x] = "Forev";
      break;
      case "fozzy4444": streamers[x] = "tv/fozzy4444";
      break;
      case "GGwpLanaya": streamers[x] = "GGwpLanaya Ift";
      break;
      case "Illidanstrdoto": streamers[x] = "Illidan";
      break;
      case "inK_Dota": streamers[x] = "@inKDota";
      break;
      case "lanarinho": streamers[x] = "Larano";
      break;
      case "midone": streamers[x] = "MidOne";
      break;
      case "Miracle_doto": streamers[x] = "Miracle-RyOuta";
      break;
      case "MiSeRyTheSLAYER": streamers[x] = "MiSeRy";
      break;
      case "MooDota2": streamers[x] = "Moo";
      break;
      case "Moonmeander": streamers[x] = "MoonMayMays";
      break;
      case "Sing_sing": streamers[x] = "SingSing";
      break;
      case "sumaildoto": streamers[x] = "SumaiL";
      break;
      case "Sovereigndota": streamers[x] = "Sovereign";
      break;
      case "universedota": streamers[x] = "Universe";
      break;
      case "w33haa": streamers[x] = "w33";
      break;
      case "WagamamaTV": streamers[x] = "Wagamama";
      break;
      default: name = streamers[x];
      break;
    }
  }
}

var streamers = []; // list of users currently streaming DOTA 2 on Twitch
var totalPlayers = []; // the names of every player on the DOTA 2 leaderboards
var totalMmr = []; // all the MMR values on the DOTA 2 leaderboards
var masterList = []; // array containing objects that have the names from totalPlayers the mmr from totalMmr and the twitchurl and logos from twitchUrls
var filteredPlayers = []; // array  with the name of streamers on the DOTA 2 leaderboards
var twitchUrls = []; // array of twitchurls from Twitch JSON request
var complete = []; // array of the filteredPlayers list with all the relevant data from the masterList
var logos = []; // array of logos from Twitch JSON request

getName(americas);
getName(china);
getName(europe);
getName(se_asia);

getMmr(americas);
getMmr(china);
getMmr(europe);
getMmr(se_asia);

arrToObject(masterList, totalPlayers, totalMmr);

request(login, function(error, response, body) {
  function filterPlayers(playerNames) {
    filteredPlayers.push(playerNames.filter(function(x) {
      return x == streamers[n];
    }).toString());
  }
  if (!error && response.statusCode == 200) {
    var live = JSON.parse(body);
    for (var i=0; i < live.streams.length; i++) {
      streamers.push(live.streams[i].channel.display_name);
      twitchUrls.push(live.streams[i].channel.url);
      logos.push(live.streams[i].channel.logo);
    }
    nameSwitch();
    for (var n=0; n < streamers.length; n++) {
      filterPlayers(totalPlayers);
    }
    clearArray(filteredPlayers);
    getTwitchUrl();
    finalList();
    complete.sort(function (a, b) {
      if (a.mmr > b.mmr) {
        return -1;
      }
      if (a.mmr < b.mmr) {
        return 1;
      }
      return 0;
    });
    fs.writeFile("./public/dreamstream.json", JSON.stringify(complete), "UTF-8");
  } else {
      console.log("Error: " + error + " Status code: " + response.statusCode);
  }
});
};
