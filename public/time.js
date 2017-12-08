/*
Only does current time at the moment. Eventually we shift to regular updates
also this might be a good place to update cards that are not referenced
by the dreamstream.json
*/

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
