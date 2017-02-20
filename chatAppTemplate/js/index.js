(function() {
  var clearResizeScroll, sendMessage;


  conf = {
    cursorcolor: "#696c75",
    cursorwidth: "4px",
    cursorborder: "none"
  };

  lol = {
    cursorcolor: "#cdd2d6",
    cursorwidth: "4px",
    cursorborder: "none"
  };


  clearResizeScroll = function() {
    $("#text").val("");
    $(".messages").getNiceScroll(0).resize();
    return $(".messages").getNiceScroll(0).doScrollTop(999999, 999);
  };

  sendMessage = function() {
    var innerText;
    innerText = $.trim($("#text").val());
    if (innerText !== "") {
      $(".messages").append("<li class=\"i\"><div class=\"head\"><span class=\"time\">"+new Date().getUTCString()+"</span><span class=\"name\"></span></div><div class=\"message\">"+innerText+"</div></li>");
      clearResizeScroll();

    }
  };

  $(document).ready(function() {
    $(".list-friends").niceScroll(conf);
    $(".messages").niceScroll(lol);
    $("#text").keypress(function(e) {
      if (e.keyCode === 13) {
        sendMessage();
        return false;
      }
    });
    return $(".send").click(function() {
      return sendMessage();
    });
  });

}).call(this);
