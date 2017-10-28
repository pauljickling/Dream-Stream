const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.dota2.com/procircuit');

// to see how the NodeList object works see https://developer.mozilla.org/en-US/docs/Web/API/NodeList

  const nameResult = await page.evaluate(() => {
   let nameArr = [];
   let playerColumn = document.querySelectorAll('span.columnContent.playerNameColumn');
   for (let i=0; i < playerColumn.length; i++) {
     nameArr.push(playerColumn.item(i).textContent);
   }
   return nameArr;
  });

  const pointsResult = await page.evaluate(() => {
    let pointsArr = [];
    let pointsColumn = document.querySelectorAll('span.columnContent.pointsColumn');
    for (let i=0; i < pointsColumn.length; i++) {
      pointsArr.push(pointsColumn.item(i).textContent);
    }
    return pointsArr;
  });

  await browser.close();
})();
