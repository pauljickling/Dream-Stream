module.exports = function() {

const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.dota2.com/procircuit');

  class Player {
    constructor(name, points) {
      this.name = name;
      this.points = points;
    }
  }

  let players = [];

  const nameResult = await page.evaluate(() => {
   let nameArr = [];
   let playerColumn = document.querySelectorAll('.playersElement > span.columnContent.playerNameColumn');
   for (let i=0; i < playerColumn.length; i++) {
     nameArr.push(playerColumn.item(i).textContent);
   }
   return nameArr;
  });

  const pointsResult = await page.evaluate(() => {
    let pointsArr = [];
    let pointsColumn = document.querySelectorAll('.playersElement > span.columnContent.pointsColumn');
    for (let i=0; i < pointsColumn.length; i++) {
      pointsArr.push(pointsColumn.item(i).textContent);
    }
    return pointsArr;
  });

  for (let i=0; i < nameResult.length; i++) {
    let p = new Player(nameResult[i], pointsResult[i]);
    players.push(p);
  }

fs.writeFile('./public/points.json', JSON.stringify(players), (err) => {
  if (err) throw err;
});

  await browser.close();
})();
}
