function loadJson() {
  let streamers = document.querySelector('div#cards');

  const request = new XMLHttpRequest();
  request.open('GET', './cards.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data = JSON.parse(request.responseText);
      streamers.innerHTML = data.text;
    } else {
      console.log('Error!!!!');
    }
  };

  request.send();
}

loadJson();
setInterval(function() {
  loadJson();
}, 300000);
