module.exports = function() {
  var fs = require("fs");
  var request = require("request");

  var destination = fs.createWriteStream("public/americas.json", "UTF-8");
  var url = "http://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=americas";

  request(url).pipe(destination);
};
