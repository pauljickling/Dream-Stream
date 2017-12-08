module.exports = function() {

  const ds = require('./public/dreamstream.json');
  const fs = require('fs');

  let cards = '';

  for (let i=0; i < ds.length; i++) {
    let url = ds[i].url;
    let lang = ds[i].lang;
    let img = ds[i].img;
    let name = ds[i].name;
    let rank;
    let points;

    if (ds[i].rank === undefined) {
      rank = 0;
    } else {
      rank = ds[i].rank;
    }

    if (ds[i].points === undefined) {
      points = 0;
    } else {
      points = ds[i].points;
    }

    let card = `<a href="${url}" class="${lang}"><div class="card"><img src="${img}">
                <p>${name}<br>
                Rank<span class="rank">${rank}</span><br>
                <span class="pointsRank">${points}</span> Qualifying Points</p>
                </div></a>\n`;
              cards = cards + card;
  }
  let file = {text: cards};
  fs.writeFile('./public/cards.json', JSON.stringify(file), 'UTF-8', (err) => {
    if (err) throw err;
  });

  console.log('cards written!');
}
