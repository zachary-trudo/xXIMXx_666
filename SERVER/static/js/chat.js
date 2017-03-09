(function() {
  var clearResizeScroll, postMessage, getMessage, getInput, showMessage, hash;

  hash = {}

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
  getInput = function(){
      /*
      /gets input the user enters and passes it to postMessage
      */
      var innerText = $.trim($('#text').val());
      if (innerText !== ""){
          var packet = {'username':'Adam' , 'message':innerText , 'date':new Date().toUTCString()};
          postMessage(packet);
      }
  };

  postMessage = function(packet) {
      /*
      /sends packet to Server
      */
      $.ajax({
          url:'/post_message',
          data: JSON.stringify(packet),
          type: 'POST',
          contentType: 'application/json',
          dataType: 'json',
          success: function(msg){
            console.log("Good news every one!");
        }
    });
      getMessage();
  };

  getMessage = function(){
      /*
      /Gets json from Server.
      */
      $.ajax({
          url:'/get_messages',
          dataType: 'json',
          type: 'GET',
          success: function(msg){
              /*
              /Checks if the message isn't already in the set hash by calling hasOwnProperty().
              /if it's not in the set then it creates a key out of the string of username+date+message,
              /this way multiple messages can be sent by the same user that potentially contain
              /the same message since the times will be different it will go through and then.
              /this prevents the server from just repeating the last message over and over
              /by the setInterval call.
              */
              if(!hash.hasOwnProperty(msg.result[msg.result.length-1].username.toString() + msg.result[msg.result.length-1].date.toString() + msg.result[msg.result.length-1].message.toString())){
                  hash[msg.result[msg.result.length-1].username.toString() + msg.result[msg.result.length-1].date.toString() + msg.result[msg.result.length-1].message.toString()] = true;
                  showMessage(msg.result[msg.result.length-1].username, msg.result[msg.result.length-1].message, msg.result[msg.result.length-1].date);
              }
          }
      });
  };

  //Call to the server to get the message every half second. Allows for users to
  //see each others messages
  window.setInterval(getMessage, 500);

  showMessage = function(username, msg, date){
      $('.messages').append("<li class=\"i\"><div class=\"head\"><span class=\"time\">"+date+"</span><span class=\"name\"></span></div><div class=\"message\">"+username + ":&nbsp " + msg +"</div></li>");
      clearResizeScroll();

  };


  $(document).ready(function() {
    $(".list-friends").niceScroll(conf);
    $(".messages").niceScroll(lol);
    $("#text").keypress(function(e) {
      if (e.keyCode === 13) {
        getInput();
        return false;
      }
    });
    return $(".send").click(function() {
      return getInput();
    });
  });

}).call(this);
