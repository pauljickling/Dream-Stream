let about = document.querySelector('li#about');
let aboutText = document.querySelector('#about-text');
let hideText = document.querySelector('span#close-about');

function showText() {
  about.addEventListener('click', function() {
    aboutText.style.visibility = 'visible';
    fadeIn(aboutText);
  });
}

showText();

function fadeIn(el) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

function hideAbout() {
  hideText.addEventListener('click', function() {
    aboutText.style.visibility = 'hidden';
  });
}

hideAbout();
