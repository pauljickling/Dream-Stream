const getJson = require('./getjson.js');
const scrape = require('./scrape.js');
const getStreamers = require('./getstreamers.js');
const helper = require('./helper.js');
/*
async function a() {
  let leaderboard = new Promise((reject, resolve) => resolve(getJson(), scrape()));
  let leaders = await leaderboard;
}

async function b() {
  let scraper = new Promise((reject, resolve) => resolve(scrape()), reject('scraping error'));
  let scrapes = await scraper;
}

async function c() {
  let dreamstream = new Promise((reject, resolve) => resolve(getStreamers()), reject('dreamstream error'));
  let dreamers = await dreamstream;
}

async function d() {
  let help = new Promise((reject, resolve) => resolve(helper()), reject('helper error'));
  let helper = await help;
}

a().then(c());
*/

let test = getJson();
console.log(test);
