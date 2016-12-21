function dreamy() {
  $.getJSON("dreamstream.json").done(function (data) {
    var dream = data;
    var sub;
    var dreamTime = new Date();
    $("div#divTime").html(dreamTime);
    console.log(dream);
    if (dream.length === 0) {
      $("div#jsonNull").html("<div id='error'>No leaderboard players found!</div>");
    } else {
      for (var i=0; i < 9; i++) {
        if (dream[i].logo === null) {
          sub = "";
        } else {
          sub = "<img src='" + dream[i].logo + "' height='66' width='66'>";
          }
          $("div#logo" + i).html(sub);
          $("div#logo" + i).addClass(dream[i].lang);
          $("div#player" + i).html("<a href='" + dream[i].twitchUrl + "'>" + dream[i].name + "</a>");
          $("div#player" + i).addClass(dream[i].lang);
          $("div#mmr" + i).html(dream[i].mmr);
          $("div#mmr" + i).addClass(dream[i].lang);
      }
    }
  });
}

setTimeout(function() {
  dreamy();
}, 500);


setInterval(function() {
  dreamy();
}, 300000);
