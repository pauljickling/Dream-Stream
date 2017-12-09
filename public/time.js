let timeStamp = new Date();
let newTime = timeStamp.toLocaleTimeString();
let timeId = document.querySelector('li#time');
timeId.textContent = `Last updated ${newTime}`;

setInterval(function() {
  let timeStamp = new Date();
  let newTime = timeStamp.toLocaleTimeString();
  let timeId = document.querySelector('li#time');
  timeId.textContent = `Last updated ${newTime}`;
}, 300000);
