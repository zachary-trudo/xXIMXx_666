(function() {
  var clearResizeScroll, postMessage, getMessage, getInput, showMessage, hash, showUser, listUsers, localUser, userHash;

  hash = {}
  userHash = {};

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
      /*
      /clears out the text box and sets up the chat box to follow messages as they
      /appear in the chat box so it scrolls as it fills up
      */

      $(".messages").getNiceScroll(0).resize();
      return $(".messages").getNiceScroll(0).doScrollTop(999999, 999);
  };
  getInput = function(){
      /*
      /gets input the user enters and passes it to postMessage
      */
      var innerText = $.trim($('#text').val());
      localUser = sessionStorage.username;
      if (innerText !== ""){
          var packet = {'username':localUser , 'message':innerText , 'date':new Date().toUTCString()};
          postMessage(packet);
          $("#text").val("");
      }
  };

  postMessage = function(packet) {
      /*
      /sends packet to Server containing username, date, message
      /upon it successfully sending, it calls getMessage() to then
      /post it to the chat box
      */
      $.ajax({
          url:'/post_message',
          data: JSON.stringify(packet),
          type: 'POST',
          contentType: 'application/json',
          dataType: 'json',
          success: function(msg){
            getMessage();

        }
    });
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
              /If it's not in the set then it creates a key out of the string of username+date+message,
              /this way multiple messages can be sent by the same user that potentially contain
              /the same message but since the times will be different it will go through.
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
  listUsers = function(){
      /*
      /Gets json data from the server.
      /Pulls the contacts from the server and adds them to the user list on the left if
      /they are not already there by checking a set called userHash. If the user is not
      /in the set then they are added to the user list and the set so they won't be added
      /more than once.
      */
      $.ajax({
          url:'/get_users',
          dataType: 'json',
          type: 'GET',
          success: function(msg){
              for(var i = 0; i < msg.result.length; i++){
                  if(!userHash.hasOwnProperty(msg.result[i].username.toString())){
                      userHash[msg.result[i].username.toString()] = true;
                      showUser(msg.result[i].username.toString());
                  }
              }
          }
      });
  };

  //Call to the server to get the message every half second and refresh user list every 2 seconds.
  //Allows for users to see each others messages and for users to see who has made an account
  window.setInterval(getMessage, 500);
  window.setInterval(listUsers, 2000);

  showMessage = function(username, msg, date){
      /*
      /Takes in a username, message, and date that is passed in from the getMessage function
      /Appends the html chatApp.html with the incoming messages then clears the text entry box
      */
      $('.messages').append("<li class=\"i\"><div class=\"head\"><span class=\"time\">"+date+"</span><span class=\"name\"></span></div><div class=\"message\">"+username + ":&nbsp " + msg +"</div></li>");
      clearResizeScroll();
  };

  showUser = function(user){
      /*
      /Takes in a username from the listUsers function
      /Appends the user list to the left of the chat box
      */
      $('.list-friends').append("<li><img width=\"50\" height =\"50\" src=\"https://s-media-cache-ak0.pinimg.com/originals/eb/c9/17/ebc917e347c0a6f87669e3564984a087.jpg\"><div class=\"user\">"+user+"</div></li>");
    }

  $(document).ready(function() {
      /*
      /sets up scrolling config
      /set up so a user can hit enter to send a message or click the send button to send a message
      */
      $(".list-friends").niceScroll(conf);
      $(".messages").niceScroll(lol);
      $("#original").click(function(){
          $('body').css("background-image", "-webkit-linear-gradient(top right, rgba(255, 255, 255, 0.6), transparent 60%, rgba(0, 0, 0, 0.6)), -webkit-linear-gradient(bottom right, #000000, #ffff00)");
          $('body').css("background-image", "linear-gradient(to bottom left, rgba(255, 255, 255, 0.6), transparent 60%, rgba(0, 0, 0, 0.6)), linear-gradient(to top left, #000000, #ffff00)");
      });
      $("#doggo").click(function(){
          $('body').css("background-image", "url('http://barkpost-assets.s3.amazonaws.com/wp-content/uploads/2013/11/dogepaints.jpg')");
          $('body').css("background-size", "cover");

      });
      $("#owl").click(function(){
          $('body').css("background-image", "url('http://i.imgur.com/xutwtmP.png')");
          $('body').css("background-size", "initial");
          $('body').css("position", "center");
      });
      $("#llamas").click(function(){
          $('body').css("background-image", "url('http://img.memecdn.com/llama-take-a-selfie_o_3305751.jpg')");
          $('body').css("background-size", "initial");
          $('body').css("position", "center");
      });
      $("#cat").click(function(){
          $('body').css("background-image", "url('https://i2.wp.com/100happybirthdaymemes.com/wp-content/uploads/2016/06/cat-meme-218141_w1000-1.jpg')");
          $('body').css("background-size", "initial");
          $('body').css("position", "center");
      });

      $("#text").keypress(function(e){
          if (e.keyCode === 13){
              getInput();
              return false;
          }
      });
      return $(".send").click(function(){
          return getInput();
      });
  });
}).call(this);
