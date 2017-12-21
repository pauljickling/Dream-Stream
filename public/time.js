let timeStamp = new Date();
let newTime = timeStamp.toLocaleTimeString();
let timeId = document.querySelector('#time');
timeId.textContent = `LAST UPDATE ${newTime}`;

setInterval(function() {
  let timeStamp = new Date();
  let newTime = timeStamp.toLocaleTimeString();
  let timeId = document.querySelector('#time');
  timeId.textContent = `LAST UPDATE ${newTime}`;
}, 300000);
