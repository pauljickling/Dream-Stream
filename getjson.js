module.exports = function() {
  const fs = require('fs');
  const request = require('request');

  function getJson(region) {
    let destination = fs.createWriteStream(`public/${region}.json`, 'UTF-8');
    let url = `http://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=${region}`;

    request(url).pipe(destination);
  }
  getJson('americas');
  getJson('china');
  getJson('europe');
  getJson('se_asia');
}
