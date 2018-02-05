function loadJson() {
  let streamers = document.querySelector('div#cards');

  const request = new XMLHttpRequest();
  request.open('GET', './cards.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data = JSON.parse(request.responseText);
      streamers.innerHTML = data.text;
      postJson(data.text);
    } else {
      console.log('Error! JSON GET Request failed.');
    }
  };

  request.send();
}

loadJson();
setInterval(function() {
  loadJson();
}, 300000);

function postJson(data) {
  const request = new XMLHttpRequest();
  request.open('POST', './');
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(data);
}
