const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.dota2.com/procircuit');

  // #playersBody .playersElement #player0, player1, player2, etc. .playerNameColumn .pointsColumn

  let player = await page.evaluate(() => document.querySelector('#player0 .playerNameColumn').textContent);
  console.log(player);

  await browser.close();
})();
