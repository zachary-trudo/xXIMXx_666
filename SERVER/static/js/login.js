(function() {
    var verifyLogin, postLogin, userHash, getUsers;

    //set containing a list of usernames already taken
    userHash = {};

    getUsers = function(){
        /*
        /Calls the server to get all contacts. This way no person can take
        /use a username that already exists
        */
        $.ajax({
            url:'/get_users',
            dataType: 'json',
            type: 'GET',
            success: function(msg){
                for(var i = 0; i < msg.result.length; i++){
                    if(!userHash.hasOwnProperty(msg.result[i].username.toString())){
                        userHash[msg.result[i].username.toString()] = true;
                    }
                }
            }
        });
    };


    verifyLogin = function(){
        /*
        /Gets the username and password entered by the user.
        /If the username or password isn't at least length 5 it will alert the user
        /that their user/pass isn't long enough.
        /Else, it sends their login info to the server and if it's incorrect
        /it alerts the user that their info is incorrect or their account doesn't
        /exist. If it's correct it loads the chat app.
        */
        var user = $.trim($("#username-3").val());
        var pass = $.trim($("#pass").val());
        if(pass == "" || pass.length < 5 || user == "" || user.length < 5){
            if(pass == "" || pass.length < 5){
                alert('Password of at least length 5 must be entered to login/create');
            }
            else{
                alert('Username of at least length 5 must be entered to login/create');
            }
        }
        else{
            sessionStorage.username = user;
            var loginInfo = {'username': user, 'password': pass};
            $.ajax({
                url:'/verify_user',
                data: JSON.stringify(loginInfo),
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                success: function(msg){
                  if(msg.result.verified){
                      window.location.href = "chatApp.html"
                  }
                  else{
                      alert("Login info incorrect/No Account exists");
                  }
              }
          });
        }
    };

    postLogin = function(){
        /*
        /Checks if the username/pass is at least length 5 and if the username is not already taken
        /alerts the user if any of those cases fail.
        /upon success a new account with that info is created by sending it to the server.
        */
        var user = $.trim($("#username-3").val());
        var pass = $.trim($("#pass").val());
        if(pass == "" || pass.length < 5 || user == "" || user.length < 5 || userHash[user] == true){
            if(pass == "" || pass.length < 5){
                alert('Password of at least length 5 must be entered to login/create');
            }
            else if (userHash[user]) {
                alert('Username is already taken. Please select a different name');
            }
            else{
                alert('Username of at least length 5 must be entered to login/create');
            }
        }
        else{
            var loginInfo = {'username': user, 'password': pass};
            $.ajax({
                url:'/post_user',
                data: JSON.stringify(loginInfo),
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                success: function(msg){
                  alert(" Account created. \n Username is: " + user + " Password is: " + pass +"\n Please Login with this information");
              }
          });
      }
  };
    $(document).ready(function() {
        /*
        /Calls getUsers immediately upon load so if an account needs to be created
        /the set of usernames already taken will be filled out immediately.
        /upon clicking the login or create button, it will verify login info for clicking
        /login. OR it will post to the server which creates an account if the create
        /button is clicked.
        */
        getUsers();
        $("#login").click(function(){
            return verifyLogin();
        });
        $("#create").click(function(){
            return postLogin();
        });
    });
}).call(this);
