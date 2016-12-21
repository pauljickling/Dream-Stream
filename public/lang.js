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
