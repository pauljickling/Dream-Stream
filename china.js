module.exports = function() {
  var fs = require("fs");
  var request = require("request");

  var destination = fs.createWriteStream("public/china.json", "UTF-8");
  var url = "http://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=china";

  request(url).pipe(destination);
};
