// see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener

let about = document.querySelector('li#about');
let aboutText = document.querySelector('#about-text');
let body = document.querySelector()
let toggle = false;

function toggleText() {
  if (toggle) {
    about.addEventListener('click', function() {
      aboutText.style.visibility = 'visible';
    });
  } else {

  }
}
