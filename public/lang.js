let lang = document.querySelector('li.nav-item-dropdown');
let list = document.querySelectorAll('.lang-dropdown');


lang.addEventListener('click', function() {
  for (index of list) {
    console.log(list.item(index));
    list.item(index).style.visibility = 'visible';
  }
  //list.style.visibility = 'visible';
  //fadeIn(list);
});

/* deprecated

$("select").change(function() {
  var lang = $("select").val();
  switch(lang) {
    case "na": $("div").show();
    break;
    case "en": $("div.en").show();
    $("div.ru").hide();
    $("div.ko").hide();
    break;
    case "ru": $("div.ru").show();
    $("div.en").hide();
    $("div.ko").hide();
    break;
    case "ko": $("div.ko").show();
    $("div.en").hide();
    $("div.ru").hide();
    break;
    default:
    break;
  }
});
*/
