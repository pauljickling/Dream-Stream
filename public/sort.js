class Sorter {
  constructor(selection, rank, points) {
    this.selection = selection;
    this.rank = rank;
    this.points = points;
  }
}

let rank = document.querySelector('li#rank');

rank.addEventListener('click', function() {
  let rankList = [];
  let rawRank = [];
  let rankSelector = document.querySelectorAll('span.rank');

  for (let i=0; i < rankSelector.length; i++) {
    let n = i+1;
    let selection = document.querySelector(`.container > a:nth-child(${n})`); //selects appropriate card
    let sorter = new Sorter(selection, parseFloat(rankSelector.item(i).textContent), null);
    rawRank.push(parseFloat(rankSelector.item(i).textContent));
    rankList.push(sorter);
  }
  console.log(rawRank);
  rawRank.sort((a, b) => a - b);
  console.log(rawRank);
  // now i need to think about how to have the position of the arrays so that they are equivalent.
  for (let r=0; r < rawRank.length; r++) {
    console.log(rawRank[r], rankList[r]);
    if (rawRank[r] !== rankList[r].rank) {

    }
  }

  let parentDiv = rankList[0].selection.parentNode;

/* this loop is a little wonky, but basically now that we have a sorted list by mmr
it is working backwards and saying the CSS selector before it in the index should precede
its sibling element in the document */
  for (let x=rankList.length; x > 1; x--) {
    parentDiv.insertBefore(rankList[x-2].selection, rankList[x-1].selection);
  }
});

// mirror image of rank sort operation

let points = document.querySelector('li#points');

points.addEventListener('click', function() {
  let pointsList = [];
  let rawPoints = [];
  let pointsSelector = document.querySelectorAll('span.pointsRank');

  for (let i=0; i < pointsSelector.length; i++) {
    let n = i+1;
    let selection = document.querySelector(`.container > a:nth-child(${n})`);
    let sorter = new Sorter(selection, null, parseFloat(pointsSelector.item(i).textContent));
    rawPoints.push(parseFloat(rankSelector.item(i).textContent));
    pointsList.push(sorter);
  }

  pointsList.sort((a, b) => a - b);
  let parentDiv = pointsList[0].selection.parentNode;

  for (let x = pointsList.length; x > 1; x--) {
    parentDiv.insertBefore(pointsList[x-2].selection, pointsList[x-1].selection);
  }

});
